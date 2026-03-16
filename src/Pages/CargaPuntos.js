import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'; // Importa useHistory
import Background from '../assets/Fondos/fondo1.png';
import './Fixture.css'; // Archivo CSS para estilos personalizados
import './Main.css';
import './pages.css';
//import Boton from "../assets/Botones/boton.png"
import Loader from 'react-loader-spinner';
import logo from '../assets/Logo.png';
import logoF1 from '../assets/Logos/logo-marquez-menu.png';
import logoF2 from '../assets/Logos/logotalleres.png';
const CargaPuntos = () => {
  // eslint-disable-next-line
  const [selectedTeam, setSelectedTeam] = useState(null); // Nuevo estado para almacenar el equipo seleccionado
  const [equipo, setEquipo] = useState(null);
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false); // Estado para controlar la visibilidad del popup de confirmación
  const [cantidadPuntos, setCantidadPuntos] = useState(5);
  const mincel = window.innerWidth <= 500;
  const userName = localStorage.dni;
  const [pointsBlue, setPointsBlue] = useState(0);
  const [pointsGreen, setPointsGreen] = useState(0);
  const [pointsWhite, setPointsWhite] = useState(0);
  const [pointsOrange, setPointsOrange] = useState(0);
  const history = useHistory();
  // Función para guardar la selección en la base de datos
  const saveSelection = () => {
    // Aquí debes implementar la lógica para guardar la selección en tu base de datos utilizando tu API
    // Por ahora, solo actualizaremos el estado local para mostrar que el equipo ha sido seleccionado
    setConfirmationVisible(false); // Ocultar el popup de confirmación
    setSelectedTeam(equipo); // Establecer el equipo seleccionado
    Register(); // Llamar a la función Register para guardar la selección en la base de datos
  };
  const goFixture = () => {
    history.push('/FixtureTotales');
  };
  // Función para mostrar el popup de confirmación
  const showConfirmation = team => {
    setEquipo(team); // Establecer el equipo seleccionado
    setGame(`${new Date().getDate()}/${new Date().getMonth() + 1}`); // Establecer el juego basado en la fecha actual (día y mes)
    setConfirmationVisible(true); // Mostrar el popup de confirmación
  };

  const closeAll = () => {
    localStorage.clear();
    document.location.href = '/Login';
  };

  const Register = async () => {
    try {
      setLoading(true);
      const body = {
        idEquipo: equipo,
        user: localStorage.dni,
        game: game,
        cantidadPuntos: String(cantidadPuntos),
      };
      //console.log(body);

      // Realizar la primera solicitud POST
      const response = await fetch('https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/registerFixture', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.error) {
        throw new Error('Failed to register fixture');
      }

      // Convertir la respuesta HTTP en JSON
      const responseData = await response.json();

      if (!responseData.error) {
        setLoading(false);
        updateTeamPoints();
      } else {
        setError(responseData.error);
        setLoading(false);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const min = window.innerWidth >= 500;
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    Height: '100vh',
  };
  const updateTeamPoints = () => {
    // Actualiza los puntos del equipo correspondiente según el equipo seleccionado
    switch (equipo) {
      case 'Azul':
        setPointsBlue(pointsBlue + parseInt(cantidadPuntos));
        break;
      case 'Verde':
        setPointsGreen(pointsGreen + parseInt(cantidadPuntos));
        break;
      case 'Blanco':
        setPointsWhite(pointsWhite + parseInt(cantidadPuntos));
        break;
      case 'Naranja':
        setPointsOrange(pointsOrange + parseInt(cantidadPuntos));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div style={{...containerStyle, justifyContent: 'flex-start'}}>
        {/* Loader y manejo de errores */}

        {error && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -20%)',
              backgroundColor: '#bf0411',
              color: 'white',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: mincel ? '1em' : '1.1em',
              padding: '10px 20px',
              borderRadius: '5px',
              zIndex: 9999,
              cursor: 'pointer',
            }}
            onClick={() => setError(null)}>
            <p style={{textAlign: 'center'}}>{error}</p>{' '}
          </div>
        )}
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '10px',
          }}>
          <img src={logo} style={{width: '180px', height: 'auto'}} alt="logo" />
          <button style={{border: 'none', backgroundColor: 'transparent'}} onClick={closeAll}>
            <p
              style={{
                marginTop: '-20px',
                fontSize: 40,
                color: 'white',
                fontWeight: 'bold',
              }}>
              X
            </p>
          </button>
        </div>

        <div style={{}}>
          {/* Título */}
          <div className="title" style={{textAlign: 'center', marginTop: min ? '30px' : '-20px'}}>
            <p>CARGA PUNTOS JUEGO:{userName}</p>
            <div
              style={{
                width: '300px',
                margin: 'auto',
                borderBottom: '4px solid #13A538', // Estilo del underline
              }}></div>
          </div>

          {/* Botones fijos */}
          <div
            style={{
              zIndex: 900,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              padding: 10,
            }}>
            <button
              className="team-button"
              style={{backgroundColor: '#102D69', margin: '10px'}}
              onClick={() => {
                showConfirmation('Azul'); // Mostrar la confirmación
              }}>
              <div>
                <p style={{marginTop: 10}}> Equipo Azul </p>
                <p style={{marginTop: '-10px', fontSize: '1.4em'}}>{pointsBlue}</p>
              </div>
            </button>
            <button
              className="team-button"
              style={{backgroundColor: '#13A538', margin: '10px'}}
              onClick={() => {
                showConfirmation('Verde'); // Mostrar la confirmación
              }}>
              <div>
                <p style={{marginTop: 10}}>Equipo Verde</p>
                <p style={{marginTop: '-10px', fontSize: '1.4em'}}>{pointsGreen}</p>
              </div>
            </button>
            <button
              className="team-button"
              style={{
                backgroundColor: '#fff',
                margin: '10px',
                color: '#102D69',
              }}
              onClick={() => {
                showConfirmation('Blanco'); // Mostrar la confirmación
              }}>
              <div>
                <p style={{marginTop: 10}}>Equipo Blanco</p>
                <p style={{marginTop: '-10px', fontSize: '1.4em'}}>{pointsWhite}</p>
              </div>
            </button>
            <button
              className="team-button"
              style={{backgroundColor: '#EA580C', margin: '10px'}}
              onClick={() => {
                showConfirmation('Naranja'); // Mostrar la confirmación
              }}>
              <div>
                <p style={{marginTop: 10}}>Equipo Naranja</p>
                <p style={{marginTop: '-10px', fontSize: '1.4em'}}>{pointsOrange}</p>
              </div>
            </button>
          </div>

          {/* Input y ListBox para cantidad de puntos */}
          <div style={{textAlign: 'center', marginTop: '20px'}}>
            {/* Input */}
            <input
              type="number"
              min="5"
              value={cantidadPuntos}
              onChange={e => setCantidadPuntos(e.target.value)}
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.4em',
                width: '120px',
                border: '4px solid #000',
                backgroundColor: '#000',
                color: 'white',
                borderRadius: 8,
              }}
            />
            {/* ListBox */}
            <select value={cantidadPuntos} onChange={e => setCantidadPuntos(e.target.value)} style={{margin: '10px', padding: '5px', textAlign: 'center'}}>
              <option value="5">5 puntos</option>
              <option value="10">10 puntos</option>
              <option value="15">15 puntos</option>
            </select>
          </div>
          {loading && (
            <div>
              <Loader type="TailSpin" color="#13A538" height={80} width={80} />
            </div>
          )}
          {/* Botón para cargar puntos */}
          {/* Este botón ahora se elimina, ya que los puntos se cargarán automáticamente al presionar los botones de equipo */}
        </div>
        {/* Popup de confirmación */}
        {confirmationVisible && (
          <div
            style={{
              width: '300px',
              display: 'block',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#FFFFFF',
              border: '1px solid #FFFFFF',
              color: '#000000',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              zIndex: 999,
            }}>
            <div
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                cursor: 'pointer',
                backgroundColor: '#FFFFFF',
                fontSize: '24px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => setConfirmationVisible(false)}>
              X
            </div>
            <p
              style={{
                color: '#000000',
                borderRadius: 2,
                margin: 10,
                marginTop: '2%',
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 18,
              }}>
              ¿Estás seguro de cargar {cantidadPuntos} punto/s al Equipo {equipo}?
            </p>
            <div className="confirmation-buttons">
              <button
                style={{
                  border: 'none',
                  backgroundColor: '#13A538',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  marginRight: '10px',
                }}
                onClick={saveSelection}>
                Sí
              </button>
              <button
                style={{
                  border: 'none',
                  backgroundColor: '#EA580C',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: '5px',
                }}
                onClick={() => setConfirmationVisible(false)}>
                No
              </button>
            </div>
          </div>
        )}
        <div>
          <button
            style={{
              border: 'none',
              backgroundColor: '#13A538',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '5px',
            }}
            onClick={() => goFixture()}>
            FIXTURE
          </button>
        </div>
        {/* Mensaje de equipo seleccionado */}
        {/* {selectedTeam && (
          <div className="selected-team">
					 Has seleccionado el Equipo {selectedTeam} Le Cargas {cantidadPuntos} ?
          </div>
        )} */}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 1,
          left: 20,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <img alt="imagen" style={{maxWidth: min ? '8vw' : '20vw', marginRight: 40}} src={logoF1} />
        <img alt="imagen" style={{maxWidth: min ? '8vw' : '20vw'}} src={logoF2} />
      </div>
    </div>
  );
};

export default CargaPuntos;
