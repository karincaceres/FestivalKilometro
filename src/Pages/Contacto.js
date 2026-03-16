import React from 'react';
import './Main.css';
import Background from '../assets/Fondos/fondo1.png';
import ImgIzquierda from '../assets/titulos/contqacto.png'; // CONTACTO
import ImgRayo from '../assets/titulos/rayo.png'; // Rayo decorativo
import IconIG from '../assets/icons/ig.png'; // Ícono Instagram
import IconMail from '../assets/icons/gmail.png'; // Ícono Gmail

class Contacto extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768;

    const mailtoHref =
      'mailto:qlkfest@gmail.com?subject=Consulta%20sobre%20la%20Fiesta%20QLKFest';

    // 🔹 Fondo principal
    const containerStyle = {
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: isMobile ? 'center' : 'space-between', // 3 bloques distribuidos
      alignItems: 'center',
      color: 'white',
      fontFamily: 'FuturaHvBTHeavy',
      position: 'relative',
      padding: isMobile ? '40px 10px' : '0 5%',
      textAlign: isMobile ? 'center' : 'left',
    };

    // 🔹 BLOQUE 1: Imagen CONTACTO (pegada al borde izquierdo)
    const imageLeftStyle = {
      width: isMobile ? '85%' : '450px',
      maxWidth: '420px',
      objectFit: 'contain',
      position: isMobile ? 'relative' : 'absolute',
      left: 0,
      top: isMobile ? '-60px' : '50%',
      transform: isMobile ? 'none' : 'translateY(-50%)',
    };

    // 🔹 BLOQUE 2: Texto + íconos centrado
    const centerBlockStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: isMobile ? 'center' : 'center',
      textAlign: isMobile ? 'center' : 'left',
      width: isMobile ? '90%' : '33%',
      margin: isMobile ? '0 auto' : '0 auto',
      marginTop:isMobile ? '-50px' : '0',
      zIndex: 2,
    };

    const phraseStyle = {
      fontSize: isMobile ? '1.3em' : '1.2em',
      fontFamily: 'FuturaHvBTHeavy',
      fontWeight: 600,
      color: '#fff',
      fontStyle: 'italic',
      marginBottom: '10px',
      marginTop:isMobile ? '20px':'-50px'
    };

    const contactRow = {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#fff',
      transition: 'transform 0.3s ease, filter 0.3s ease',
      justifyContent: isMobile ? 'center' : 'flex-start',
    };

    const iconStyle = {
      width: isMobile ? '230px' : '250px',
      height: 'auto',
    
     
    };

    const handleHover = e => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.filter = 'brightness(1.3)';
    };
    const handleOut = e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.filter = 'brightness(1)';
    };

    // 🔹 BLOQUE 3: Imagen del rayo a la derecha centrada
    const imageRayoStyle = {
      width: isMobile ? '18%' : '130px',
      objectFit: 'contain',
      opacity: 0.9,
      position: isMobile ? 'relative' : 'absolute',
      right: isMobile ? '0' : '15%',
      top: isMobile ? '0' : '50%',
      transform: isMobile ? 'none' : 'translateY(-50%)',
    };

    return (
      <div style={containerStyle}>
        {/* BLOQUE 1: Imagen CONTACTO */}
        <img src={ImgIzquierda} alt="Contacto" style={imageLeftStyle} />

        {/* BLOQUE 2: Texto + íconos centrado */}
        <div style={centerBlockStyle}>
          <p style={phraseStyle}>
            Cualquier duda o consulta<br />
            estamos para ayudarte!
          </p>

          <a
            href="https://www.instagram.com/qlkfest/"
            target="_blank"
            rel="noopener noreferrer"
            style={contactRow}
            onMouseOver={handleHover}
            onMouseOut={handleOut}
          >
            <img src={IconIG} alt="Instagram" style={iconStyle} />
          </a>

          <a
            href={mailtoHref}
            style={contactRow}
            onMouseOver={handleHover}
            onMouseOut={handleOut}
          >
            <img src={IconMail} alt="Email" style={iconStyle} />
          </a>
        </div>

        {/* BLOQUE 3: Imagen del RAYO */}
        <img src={ImgRayo} alt="Rayo decorativo" style={imageRayoStyle} />
      </div>
    );
  }
}

export default Contacto;
