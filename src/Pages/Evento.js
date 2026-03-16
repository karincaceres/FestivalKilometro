import React from 'react';
import './Main.css';

import fondoDesktop from '../assets/Fondos/fondo1.png';
import fondoMobile from '../assets/Fondos/fondoV.png';

import imgGeneral from '../assets/Botones/entrada_general.png';
import imgTribuna from '../assets/Botones/entrada_ultravip.png';
import imgBoxes from '../assets/Botones/entrada_vip_full_standing.png';
import imgVip from '../assets/Botones/entrada_paqrking.png';

// 🖼️ Títulos
import tituloDesktop from '../assets/titulos/TIPOSDE-ENTRADAS.png';
import tituloMobile from '../assets/titulos/tipoentradascelu.png';

const Evento = ({ redirect }) => {
  const isMobile = window.innerWidth <= 768;

  const containerStyle = {
    minHeight: '100vh',
    backgroundImage: `url(${isMobile ? fondoMobile : fondoDesktop})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isMobile ? '0 0' : '10vh 5vw',
    position: 'relative',
  };

  const titleContainerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isMobile ? '60px' : '40px',
    marginTop: isMobile ? '-60px' : '80px',
  };

  const titleImageStyle = {
    width: isMobile ? '50%' : '35%',
    height: 'auto',
    objectFit: 'contain',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: isMobile ? '25px 15px' : '2vw',
    width: isMobile ? '90%' : '90%',
    justifyItems: 'center',
    alignItems: 'center',
    marginTop: isMobile ? '-40px' : '0',
  };

  const buttonStyle = {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    width: isMobile ? '42vw' : '18vw',
    maxWidth: isMobile ? '160px' : '300px',
    transition: 'transform 0.3s ease',
  };

  const handleHover = e => (e.currentTarget.style.transform = 'scale(1.05)');
  const handleOut = e => (e.currentTarget.style.transform = 'scale(1)');

  return (
    <div style={containerStyle}>
      {/* 🔹 Título centrado arriba */}
      <div style={titleContainerStyle}>
        <img
          src={isMobile ? tituloMobile : tituloDesktop}
          alt="Tipos de Entradas"
          style={titleImageStyle}
        />
      </div>

      {/* 🔹 Grilla de botones */}
      <div style={gridStyle}>
        <button
          style={buttonStyle}
          onClick={() => redirect('entrada-general')}
          onMouseOver={handleHover}
          onMouseOut={handleOut}
        >
          <img
            src={imgGeneral}
            alt="Entrada General"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </button>

        <button
          style={buttonStyle}
          onClick={() => redirect('entrada-tribuna')}
          onMouseOver={handleHover}
          onMouseOut={handleOut}
        >
          <img
            src={imgBoxes}
            alt="Entrada Tribuna"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </button>

        <button
          style={buttonStyle}
          onClick={() => redirect('entrada-boxes')}
          onMouseOver={handleHover}
          onMouseOut={handleOut}
        >
          <img
            src={imgTribuna}
            alt="Entrada Boxes"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </button>

        <button
          style={buttonStyle}
          onClick={() => redirect('entrada-parking')}
          onMouseOver={handleHover}
          onMouseOut={handleOut}
        >
          <img
            src={imgVip}
            alt="Entrada Parking"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </button>
      </div>
    </div>
  );
};

export default Evento;
