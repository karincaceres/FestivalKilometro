import React from 'react';
import Background from '../assets/Fondos/fondo1.png';
import BackgroundR from '../assets/Fondos/fondoV.png';
import ImgVip from '../assets/Botones/entrada_vip_full_standing.png';
import './Main.css';

class EntradaVip extends React.Component {
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
          <img src={ImgVip} alt="VIP FULL" style={imgStyle} />

          <a
            href="https://qlokura.tv/evento/VIP-FULL-STANDING-QLK-FEST/8241" // 🔗 reemplazá con el link real de compra
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
            Sentí la energía bien cerca del escenario
          </h2>

          <p
            style={{
              fontWeight: 'bold',
              fontSize: '1em',
              fontFamily: 'FontsFree-Net-Druk-Wide-Bold',
            }}
          >
            Con tu entrada{' '}
            <span
              style={{
                color: '#D8DE3E',
                fontFamily: 'FontsFree-Net-Druk-Wide-Bold',
              }}
            >
              VIP FULL
            </span>{' '}
            disfrutás de:
          </p>

          <ul
            style={{
              listStyle: 'disc',
              marginLeft: '20px',
              marginBottom: '10px',
            }}
          >
            <li>Ingreso por acceso diferenciado</li>
            <li>Ubicación destacada frente al escenario</li>
            <li>Baños exclusivos</li>
            <li>Barras preferenciales</li>
            <li>2 consumiciones de bebida incluidas</li>
            <li>Acceso al patio gastronómico (no incluye consumición)</li>
            <li>
              Zonas de experiencias exclusivas con sponsors y marcas aliadas
            </li>
          </ul>

          <p
            style={{
              fontStyle: 'italic',
              color: 'white',
              marginTop: '10px',
              fontFamily: 'FontsFree-Net-Druk-Wide-Bold',
            }}
          >
            La combinación perfecta entre comodidad, vista y experiencia.
          </p>
        </div>
      </div>
    );
  }
}

export default EntradaVip;
