import React from 'react';
import Imagen from '../assets/Titulos/mapas.png';
import ImagenMap from '../assets/RECURSOS/Mapa1.jpg';
import './pages.css';
import maps from '../assets/Botones/maps.png';

class Ubicacion extends React.Component {
  mapa() {
    window.open('https://maps.app.goo.gl/fyFiYnf7euDcXEETA');
  }

   render() {
    const max = window.innerWidth >= 1400;
    const mid = window.innerWidth > 1000 && window.innerWidth < 1400;
    const mincel = window.innerWidth <= 500;

    const containerStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // Toma toda la altura de la pantall
      marginBottom: mincel ? '0' : '0', // Ajusta el margen inferior
        marginTop: max ? '10px' : mid ? '10px' : '10px',
    };

    return (
      <div style={containerStyle}>
        <div className="concepto-content" style={{  gap:mincel?'0': '10%',width:'100vw' }}>
          <div className="left-column" style={{
            width: '90%',

            justifyContent: mincel ? 'center' : 'flex-end', // Centra verticalmente en dispositivos medianos
            alignContent: mincel ? 'center' : 'flex-end',
            textAlign: mincel ? 'center' : 'right', // Centra horizontalmente en dispositivos medianos
            alignItems: mincel ? 'center' : 'right'
          }}>
            <img src={Imagen} alt="Imagen Concepto" style={{ width: mid ? '80%' : max ? '80%' : '90%' }} />
          </div>

          <div className="right-column" style={{
            width: '100vw',

            justifyContent: mincel ? 'center' : 'flex-start',
            alignContent: mincel ? 'center' : 'flex-start',
            textAlign: mincel ? 'center' : 'left',
            alignItems: mincel ? 'center' : 'left',
            marginTop: mincel?'':'',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: mid ? '10px' : '' // Ajusta el margen inferior en dispositivos medianos
          }}>
            <img src={ImagenMap} alt="Imagen Concepto" style={{ width: mid ? '60%' : max ? '50%' : mincel? '70%' :'80%' }} />

            <button style={{cursor:'ponter',border:'none', marginTop: mincel ? '2%' : '10px', width: max ? '30%' : mid ? '40%' : '80%', backgroundColor:'transparent' }} onClick={() => this.mapa()}>
              <img src={maps} alt="Imagen BotonMapa" style={{ width: mincel? '70%':'100%' }} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Ubicacion;
