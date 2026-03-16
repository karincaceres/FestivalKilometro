import {Button} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import logo from '.././assets/Logo.png';
import back from '../assets/Fondos/fondo1.png';
import './Main.css';

const styles = {
  defaultParagraph: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center', // Centrar el texto horizontalmente
  },
  specialParagraph: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    borderRadius: '50%',
    width: '70px',
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '2px solid',
    margin: '0 auto', // Centrar horizontalmente usando margen
    textAlign: 'center',
    marginBottom: 2, // Centrar el texto horizontalmente
  },
};

function Metricas(props) {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const body = {}; // Define el cuerpo de la solicitud con los datos que deseas enviar
      const response = await fetch('https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/consultIngresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      } else {
        const jsonData = await response.json();

        setData(jsonData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const close = () => {
    localStorage.clear();
    document.location.href = '/Login';
  };

  return (
    <div className="App" style={{width: window.innerWidth, height: '100vh', backgroundImage: `url(${back})`, backgroundSize: 'cover'}}>
      <div>
        <img src={logo} style={{width: '180px', height: 'auto', marginTop: 20}} alt="logo"></img>
        <Button style={{marginLeft: 30}} onClick={() => close()}>
          <p style={{marginTop: 10, position: 'absolute', fontSize: 40, color: 'white', fontWeight: 'bold', paddingLeft: 20, width: '60px', height: 'auto'}}>X</p>
        </Button>
      </div>

      <Button onClick={fetchData} variant="contained" color="primary" style={{marginTop: 20}}>
        Actualizar
      </Button>
      {data && (
        <div style={{color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'center'}}>
          <p style={styles.defaultParagraph}>Total Invitados: </p>
          <p style={styles.specialParagraph}>{data.TOTAL}</p>
          {/* <p style={styles.defaultParagraph}>Cantidad de Ingresos con QR:</p>
                    <p style={styles.specialParagraph}>{data.InscriptosQR}</p> */}
          <p style={styles.defaultParagraph}>Total de Ingresos: </p>
          <p style={styles.specialParagraph}>{data.Total}</p>
          <p style={styles.defaultParagraph}>FALTAN: </p>
          <p style={styles.specialParagraph}>{data.TotalFaltan}</p>
        </div>
      )}
    </div>
  );
}

export default Metricas;
