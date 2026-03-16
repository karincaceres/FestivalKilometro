import React, {useState} from 'react';
import Loader from 'react-loader-spinner';
import Aceptar from '../assets/Botones/ACTUALIZAR.png';
import Background from '../assets/Fondos/fondo1.png';
import './Fixture.css'; // Archivo CSS para estilos personalizados
import './Main.css';
import './pages.css';
//import Boton from "../assets/Botones/boton.png"
const Fixture = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataFix, setDataFix] = useState(false);
  const mid = window.innerWidth > 1000 && window.innerWidth < 1400;
  const mincel = window.innerWidth <= 500;

  const DataFixture = () => {
    setLoading(true);
    const body = {
      game: 'total',
    };

    fetch('https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/registerFixture', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          setDataFix(false);
          throw new Error('Error de red: ' + response.statusText);
        }
      })
      .then(response => {
        if (!response.error) {
          setData(response);
          setLoading(false);
          setDataFix(true);
        } else {
          setLoading(false);
          setDataFix(false);
          setError('SIN DATOS');
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        setError('Error al obtener los datos:', error);
        setLoading(false);
        setDataFix(false);
      });
  };

  // Calcular el equipo con más juegos ganados
  let maxTeam = null;
  let maxPoints = -1;
  for (const team in data && data.team_counts) {
    if (data.team_counts.hasOwnProperty(team)) {
      if (data.team_counts[team] > maxPoints) {
        maxPoints = data.team_counts[team];
        maxTeam = team;
      }
    }
  }

  const containerStyle = {
    height: '100vh',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    margin: 0,
    top: 0,
    width: '100vw',
    border: 'none',
    maxWidth: '100%',
    bottom: 0,
    display: 'flex',
    zIndex: 1,
    flex: 1,
    flexDirection: mincel ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={containerStyle}>
      <div className="left-column">
        <div style={{display: 'flex', alignItems: mincel ? 'center' : 'flex-end', flexDirection: 'column'}}>
          <p className="title">FIXTURE</p>
          <div
            style={{
              width: '300px',
              marginTop: '-40px',
              borderBottom: '4px solid #13A538', // Estilo del underline
            }}></div>
          <button onClick={() => DataFixture()} style={{cursor: 'pointer', backgroundColor: 'transparent', border: 'none'}}>
            <img alt="imagen1" width="130px" height="auto" src={Aceptar}></img>
          </button>
        </div>
      </div>
      {loading && (
        <div>
          <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <Loader type="TailSpin" color="#13A538" height={80} width={80} />
          </div>
        </div>
      )}

      {error && (
        <div style={{width: '300px', display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#EA580C', color: '#000000', padding: '20px', borderRadius: '10px', textAlign: 'center', zIndex: 999}}>
          <div style={{position: 'absolute', top: '-15px', right: '-15px', cursor: 'pointer', backgroundColor: '#FFFFFF', fontSize: '24px', width: '36px', height: '36px', borderRadius: '50%', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => setError(false)}>
            X
          </div>
          <p style={{fontSize: '1.5em', borderRadius: 2, margin: 10, marginTop: 20, color: 'white', fontFamily: 'Montserrat-SemiBold'}}>{error}</p>
        </div>
      )}
      <div className="right-column" style={{width: '50vw', marginTop: mincel ? '-2px' : '30px', display: 'flex', flexDirection: mincel ? 'column' : 'column', justifyContent: 'center', alignItems: 'center', textAlign: mincel ? 'center' : 'center', marginBottom: mid ? '10px' : ''}}>
        {dataFix && (
          <>
            {/* Primera fila de círculos */}
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: mincel ? '20px' : ''}}>
              {Object.keys(data.counts_by_team_and_game)
                .slice(0, 2)
                .map((team, index) => (
                  <div key={index} style={{padding: mincel ? 10 : 10, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: mincel ? 0 : '20px'}}>
                    <div style={{width: mincel ? '100px' : '15vw', height: mincel ? '100px' : '15vw', backgroundColor: index % 2 === 0 ? '#fff' : '#102D69', borderRadius: '50%', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                      <p style={{color: '#13A538', fontSize: mincel ? '1.6' : '2em'}}>{data.team_counts && data.team_counts[team]}</p>
                      <p style={{color: '#13A538', fontSize: '1em'}}>PUNTOS</p>
                    </div>
                    <div style={{color: 'white', border: '2px solid  #13A538', padding: mincel ? 2 : 10, width: '100px', height: mincel ? '80px' : '100px'}}>
                      {Object.keys(data.counts_by_team_and_game[team]).map((game, gameIndex) => (
                        <div key={gameIndex}>
                          {game}: {data.counts_by_team_and_game[team][game]}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Segunda fila de círculos */}
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: mincel ? '20px' : ''}}>
              {Object.keys(data.counts_by_team_and_game)
                .slice(2, 4)
                .map((team, index) => (
                  <div key={index + 2} style={{padding: mincel ? 10 : 10, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: mincel ? 0 : '20px'}}>
                    <div style={{width: mincel ? '100px' : '15vw', height: mincel ? '100px' : '15vw', backgroundColor: index % 2 === 0 ? '#13A538' : '#EA580C', borderRadius: '50%', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                      <p style={{color: 'white', fontSize: mincel ? '1.6' : '2em'}}>{data.team_counts && data.team_counts[team]}</p>
                      <p style={{color: 'white', fontSize: '1em'}}>PUNTOS</p>
                    </div>
                    <div style={{color: 'white', border: '2px solid  #13A538', padding: mincel ? 2 : 10, width: '100px', height: mincel ? '80px' : '100px'}}>
                      {Object.keys(data.counts_by_team_and_game[team]).map((game, gameIndex) => (
                        <div key={gameIndex}>
                          {game}: {data.counts_by_team_and_game[team][game]}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>

      {maxPoints !== 0 && (
        <div className="winner" style={{alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: '-1px', fontWeight: 'bold', color: maxTeam === 'Blanco' ? '#102D69' : 'white', marginLeft: mincel ? '' : '5px', marginBottom: 20, marginRight: '5px'}}>
          {maxTeam && (
            <div style={{height: mincel ? '80px' : '100px', border: '2px solid  #13A538', padding: mincel ? 2 : 10, width: mincel ? '60vw' : '15vw', backgroundColor: maxTeam === 'Azul' ? '#102D69' : maxTeam === 'Verde' ? '#13A538' : maxTeam === 'Blanco' ? '#fff' : maxTeam === 'Naranja' ? '#EA580C' : ''}}>
              EQUIPO {maxTeam} va ganando con
              <p style={{fontSize: mincel ? '1.2em' : '1.5em'}}>{maxPoints} puntos</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Fixture;
