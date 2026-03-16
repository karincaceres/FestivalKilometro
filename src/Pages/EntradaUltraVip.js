import React from 'react';
import Background from '../assets/Fondos/fondo1.png';
import BackgroundR from '../assets/Fondos/fondoV.png';
import ImgUltra from '../assets/Botones/entrada_ultravip.png';
import './Main.css';

class EntradaUltraVip extends React.Component {
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
      padding: isMobile ? '2px 12px' : '4px 12px',
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
          <img src={ImgUltra} alt="Ultra VIP" style={imgStyle} />

          <a
            href="https://qlokura.tv/evento/ULTRA-VIP-QLK-FEST/8242"
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
              fontWeight: 'bold',
              fontSize: '1.6em',
              marginBottom: '10px',
            }}
          >
            Tu lugar para vivir el festival sin límites
          </h2>

          <p
            style={{
              fontWeight: 'bold',
              fontSize: '1em',
              fontFamily: 'FontsFree-Net-Druk-Wide-Bold',
            }}
          >
            Con{' '}
            <span
              style={{
                color: '#D8DE3E',
                fontFamily: 'FontsFree-Net-Druk-Wide-Bold',
              }}
            >
              ULTRA VIP
            </span>{' '}
            accedés:
          </p>

          <ul
            style={{
              listStyle: 'disc',
              marginLeft: '20px',
              marginBottom: '10px',
            }}
          >
            <li>Ingreso preferencial por acceso VIP</li>
            <li>Incluye ticket de parking con espacio reservado dentro del predio</li>
            <li>Acceso directo a un sector diferenciado, sobre plataforma elevada frente al escenario</li>
            <li>Baños y barra VIP</li>
            <li>4 consumiciones de bebida + 2 de comida incluidas</li>
            <li>Acceso al patio gastronómico con food trucks</li>
            <li>Zonas de experiencias exclusivas con sponsors y marcas aliadas</li>
          </ul>

          <p
            style={{
              fontStyle: 'italic',
              fontFamily: 'FontsFree-Net-Druk-Wide-Bold',
              color: 'white',
            }}
          >
            Un espacio pensado para quienes quieren vivir el QLK FEST al máximo.
          </p>
        </div>
      </div>
    );
  }
}

export default EntradaUltraVip;
