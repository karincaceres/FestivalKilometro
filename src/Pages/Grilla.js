import React from 'react';
import ImagenWeb from '../assets/Grilla/Grilla_completa.png';   // versión web
import ImagenMobile from '../assets/Grilla/Grilla_completaCel.png'; // versión móvil (si la tenés)
import Background from '../assets/Fondos/fondo1.png';
import BackgroundR from '../assets/Fondos/fondoV.png';
import './Main.css';

class Grilla extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768;
    const Back = isMobile ? BackgroundR : Background;
    const Imagen = isMobile ? ImagenMobile : ImagenWeb;

    // 🔹 Contenedor principal con fondo y centrado
    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${Back})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    };

    // 🔹 Imagen centrada
    const imageStyle = {
      width: isMobile ? '90%' : '100%',
      height: 'auto',
      objectFit: 'contain',
    };

    return (
      <div style={containerStyle}>
        <img src={Imagen} alt="Grilla" style={imageStyle} />
      </div>
    );
  }
}

export default Grilla;
