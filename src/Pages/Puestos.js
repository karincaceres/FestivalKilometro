import React from 'react';
import './Main.css';

import Background from '../assets/Fondos/fondo1.png';
import BackgroundR from '../assets/Fondos/fondoV.png';

import logo from '../assets/Comercial/bot_fiestapelota.png';
import Paseo from '../assets/Comercial/Bot_Pelota_VerPropuesta.png';
import micro from '../assets/Comercial/Bot_micro.png';
import image1 from '../assets/Comercial/Bot_Publi.png';

// eslint-disable-next-line


class Puestos extends React.Component {
  render() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const Back = isMobile ? BackgroundR : Background;

    const containerStyle = {
      backgroundImage: `url(${Back})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Baloo',
      position: 'relative',
    };

 

    const bandStyleOuter = {
      width: '100%',
      marginTop: '-40px',
      background: 'rgba(0, 0, 0, 0.5)',
      padding: isMobile ? '20px 10px' : '40px 20px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };

    const introTextStyle = {
      fontSize: isMobile ? '1em' : '1.15em',
      color: 'white',
      fontFamily: 'FONTSFREE-NET-BWMITGA-REGULAR',
      textAlign: 'center',
      marginBottom: '30px',
    };

    // === GRID 2x2 SIEMPRE (web y mobile) ===
    const gridStyle = {
      width: '100%',
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(140px, 1fr))',
      gridAutoRows: 'auto',
      gap: isMobile ? '16px' : '6px',
      alignItems: 'center',
      justifyItems: 'center',
      // Áreas:  a b / c d
      gridTemplateAreas: `
        "a b"
        "c d"
      `,
    };

    const cell = area => ({
      gridArea: area,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });

    // imagen responsiva sin deformar
    const imgStyle = {
      width: '100%',
      maxWidth: isMobile ? 360 : 420, // limita ancho para que queden parejas
      height: 'auto',
      objectFit: 'contain',
      display: 'block',
    };

    return (
      <div style={containerStyle}>
       
        <div style={bandStyleOuter}>
          <p style={introTextStyle}>Ingresá en cada una de las opciones y encontrá el detalle de la propuesta</p>

          {/* Orden fijo: arriba Paseo + Micro, abajo Logo + Publicidad */}
          <div style={gridStyle}>
            <div style={cell('a')}>
              <img src={Paseo} alt="Paseo de la Pelota" style={imgStyle} />
            </div>

            <div style={cell('b')}>
              <a href="https://forms.gle/AEEjek8fQbJzuKZ56" target="_blank" rel="noopener noreferrer">
                <img src={micro} alt="Micro" style={imgStyle} />
              </a>
            </div>

            <div style={cell('c')}>
              <img src={logo} alt="Fiesta de la Pelota" style={imgStyle} />
            </div>

            <div style={cell('d')}>
              <a href="https://forms.gle/SdBk2ZR2ppvmH2in6" target="_blank" rel="noopener noreferrer">
                <img src={image1} alt="Publicidad Fiesta de la Pelota" style={imgStyle} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Puestos;
