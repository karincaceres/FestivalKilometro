import React, {useMemo, useState} from 'react';
import Loader from 'react-loader-spinner';
import {useTable} from 'react-table'; // Importar useTable desde react-table
import * as XLSX from 'xlsx';
import Aceptar from '../assets/Botones/ACTUALIZAR.png';
import Background from '../assets/Fondos/fondo1.png';
import './Fixture.css'; // Archivo CSS para estilos personalizados

const FixtureTotales = () => {
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

    fetch('https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/FixtureTotales', {
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

  const exportToExcel = () => {
    if (data) {
      const dataArray = Object.values(data); // Convertir el objeto a un array
      const worksheet = XLSX.utils.json_to_sheet(dataArray);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
      XLSX.writeFile(workbook, 'datos.xlsx');
    }
  };

  const columns = useMemo(
    () => [
      {Header: 'EQUIPO', accessor: 'idEquipo'},
      {Header: 'JUEGO', accessor: 'user'},
      {Header: 'PUNTOS', accessor: 'counts_by_team_and_game'},
      {Header: 'FECHA', accessor: 'game_counts'},
    ],
    [],
  );

  const containerStyle = {
    // Define containerStyle
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
    flexDirection: mincel ? 'column' : 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const rightColumnStyle = {
    // Define rightColumnStyle
    width: '50vw',
    marginTop: mincel ? '-2px' : '30px',
    display: 'flex',
    flexDirection: mincel ? 'column' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: mincel ? 'center' : 'center',
    marginBottom: mid ? '10px' : '',
  };

  // Convertir el objeto de datos a un array antes de pasarlo a useTable
  const dataArray = data ? Object.values(data) : [];
  const table = useTable({columns, data: dataArray});

  const renderTableData = () => {
    return (
      <tbody>
        {dataArray.map((row, index) => (
          <tr key={index}>
            <td>{row.idEquipo}</td>
            <td>{row.user}</td>
            <td>{row.counts_by_team_and_game}</td>
            <td>{row.game_counts}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div style={{containerStyle}}>
      <div className="left-column">
        <div>
          <p className="title">FIXTURE</p>
          <div></div>
          <button onClick={() => DataFixture()}>
            <img alt="imagen1" width="130px" height="auto" src={Aceptar}></img>
          </button>
          {data && <button onClick={exportToExcel}>Exportar a Excel</button>}
        </div>
      </div>

      {loading && (
        <div>
          <div>
            <Loader type="TailSpin" color="#13A538" height={80} width={80} />
          </div>
        </div>
      )}

      {error && (
        <div>
          <div>
            <div onClick={() => setError(false)}>X</div>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div style={{rightColumnStyle}}>
        <div>
          <button onClick={exportToExcel}>Exportar a Excel</button>
          <table>
            <thead>
              {table.headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            {renderTableData()}
          </table>
        </div>
        {dataFix && (
          <>
            <div>
              <h2>Por Equipo</h2>
              <div>
                {Object.keys(data.team_counts).map(teamName => (
                  <div key={teamName}>
                    <strong>{teamName}</strong>:
                    {Object.keys(data.team_counts[teamName]).map(entry => (
                      <div key={entry}>
                        {entry}: {data.team_counts[teamName][entry]} puntos
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2>Por Juego</h2>
              <ul>
                {Object.keys(data.game_counts).map(gameDate => (
                  <li key={gameDate}>
                    <strong>{gameDate}</strong>:
                    <ul>
                      {Object.keys(data.game_counts[gameDate]).map(entry => (
                        <li key={entry}>
                          {entry}: {data.game_counts[gameDate][entry]} puntos
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FixtureTotales;
