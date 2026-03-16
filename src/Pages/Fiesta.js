import React from 'react';
import './Main.css';
import Background from '../assets/Fondos/fondo1.png';
import BackgroundR from '../assets/Fondos/fondoV.png';
import EscenarioImg from '../assets/Grilla/foto_elfestival.png'; // imagen del escenario o foto de la fiesta

const Fiesta = () => {
  const isMobile = window.innerWidth <= 768;
const Back = isMobile ? BackgroundR : Background;
  const containerStyle = {
    height:'100vh',
    width:'100vw',
    backgroundImage: `url(${Back})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: isMobile ? '40px 20px' : '80px 60px',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: isMobile ? '30px' : '60px',
  };

  const imageStyle = {
    width: isMobile ? '100%' : '45%',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0,0,0,0.6)',
    marginTop: isMobile? '80px':''
  };

  const textContainer = {
    width: isMobile ? '100%' : '45%',
    textAlign: isMobile ? 'left' : 'left',
  };

  const titleStyle = {
    fontFamily: 'FontsFree-Net-Druk-Wide-Bold',
    color: '#D8DE3E',
    fontSize: isMobile ? '1.8em' : '1.5em',
    marginBottom: '10px',
  };

  const subtitleStyle = {
    fontFamily: 'FuturaHvBTHeavy',
    fontStyle: 'italic',
    fontWeight:'bold',
    fontSize: isMobile ? '1em' : '1em',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontFamily: 'FuturaBkBTBook1',
     fontStyle: 'italic',
    fontSize: isMobile ? '0.9em' : '1em',
    lineHeight: '1.5em',
    maxWidth: '600px',
  };

  return (
    <div style={containerStyle}>
      {/* Imagen izquierda */}
      
      <img src={EscenarioImg} alt="Escenario QLK Fest" style={imageStyle} />

      {/* Texto derecha */}
      <div style={textContainer}>
        <h2 style={titleStyle}>La expansión del ADN Q´ Lokura</h2>
        <h3 style={subtitleStyle}>Más que un show, una experiencia única.</h3>
        <p style={paragraphStyle}>
          Creado y producido por <strong>Q´Lokura</strong>, QLK Fest es el gran encuentro en vivo donde la energía,
          la pasión y la conexión con el público alcanzan otra dimensión.
        </p>
        <p style={paragraphStyle}>
          Cada edición reúne a miles de personas que comparten un mismo sentimiento: ser parte del fenómeno QLK.
        </p>
        <p style={paragraphStyle}>
          Con una identidad propia y una visión en expansión, QLK Fest se consolida como una marca de experiencias que recorre ciudades,
          fusiona géneros, suma artistas invitados y propone una estética distintiva, siempre fiel al ADN Q´Lokura.
        </p>
      </div>
    </div>
  );
};

export default Fiesta;
