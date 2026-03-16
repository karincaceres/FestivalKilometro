import React from 'react';
import Background from '../assets/Fondos/fondo1.png';
import BackgroundR from '../assets/Fondos/fondoV.png';
import ImgParking from '../assets/Botones/entrada_paqrking.png';
import './Main.css';

class EntradaParking extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768;
    const Back = isMobile ? BackgroundR : Background;

    const containerStyle = {
      backgroundImage: `url(${Back})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '100px 5vw' : '120px 10vw',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '5vw',
      position: 'relative',
    };

    const imageContainer = {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    };

    const imgStyle = {
      width: isMobile ? '50vw' : '28vw',
      height: 'auto',
      objectFit: 'contain',
      boxShadow: '0 0 20px rgba(0,0,0,0.6)',
    };

    const buttonStyle = {
      backgroundColor: '#D8DE3E',
      color: '#000',
      fontFamily: 'FontsFree-Net-Druk-Wide-Bold',
      border: 'none',
      borderRadius: '40px',
      padding: isMobile ? '2px 12px' : '4px 5px',
      fontSize: isMobile ? '0.8em' : '1em',
      cursor: 'pointer',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      transition: 'all 0.3s ease',
      boxShadow: '0px 0px 12px rgba(0,0,0,0.5)',
    };

    const handleHover = e => {
      e.currentTarget.style.backgroundColor = '#707221';
      e.currentTarget.style.color = '#fff';
      e.currentTarget.style.transform = 'scale(1.05)';
    };
    const handleOut = e => {
      e.currentTarget.style.backgroundColor = '#D8DE3E';
      e.currentTarget.style.color = '#000';
      e.currentTarget.style.transform = 'scale(1)';
    };

    const textStyle = {
      width: isMobile ? '90%' : '40%',
      textAlign: 'left',
      lineHeight: '1.6em',
    };

    return (
      <div style={containerStyle}>
        {/* 🔹 Imagen principal + botón */}
        <div style={imageContainer}>
          <img src={ImgParking} alt="Parking" style={imgStyle} />

          <a
            href="https://qlokura.tv/evento/PARKING/8247" // 🔗 reemplazá con link real de compra
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              style={buttonStyle}
              onMouseOver={handleHover}
              onMouseOut={handleOut}
            >
              COMPRAR AQUÍ
            </button>
          </a>
        </div>

        {/* 🔹 Texto descriptivo */}
        <div style={textStyle}>
          <h2
            style={{
              fontFamily: 'FontsFree-Net-Druk-Wide-Bold',
              fontSize: '1.8em',
              marginBottom: '10px',
              color: '#D8DE3E',
            }}
          >
            ¿Venís en auto?
          </h2>

          <p style={{ fontSize: '0.9em' }}>
            Sumá tu acceso de <strong>Parking</strong> y asegurá tu lugar dentro del predio.
          </p>

          <p
            style={{
              fontFamily: 'FontsFree-Net-Druk-Wide-Bold',
              marginTop: '10px',
              fontSize: '0.9em',
            }}
          >
            Válido para entradas <span style={{ color: '#D8DE3E' }}>General</span> o{' '}
            <span style={{ color: '#D8DE3E' }}>VIP FULL STANDING</span>
          </p>
        </div>
      </div>
    );
  }
}

export default EntradaParking;
