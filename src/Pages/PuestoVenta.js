import React from 'react';
import ImgTitulo from '../assets/titulos/puntosdeventa.png';
import ImgFisico from '../assets/titulos/fisico.png';
import ImgOnline from '../assets/titulos/Online.png';
import Background from '../assets/Fondos/fondo1.png';
import BackgroundR from '../assets/Fondos/fondoV.png';
import './Main.css';

class PuestoVenta extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768;
    const Back = isMobile ? BackgroundR : Background;

    const containerStyle = {
      minHeight: '100vh',
      backgroundImage: `url(${Back})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: isMobile ? '40px 15px' : '60px',
    };

    const contentStyle = {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isMobile ? '30px' : '50px',
      width: '100%',
      maxWidth: '1200px',
      marginTop: isMobile ? '50px' : '-60px',
    };

    const imgBox = {
      position: 'relative',
      width: isMobile ? '100%' : '40%',
      borderRadius: '8px',
      overflow: 'visible', // ✅ cambiamos a visible para que no corte nada
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'transparent',
    };

    const baseImgStyle = {
      width: '100%',
      height: 'auto',
      objectFit: 'contain',
      display: 'block',
    };

    const imgTituloStyle = {
      width: isMobile ? '100%' : '100%',
      height: 'auto',
      objectFit: 'contain',
      display: 'block',
      margin: isMobile ? '10px auto 0 auto' : '0',
    };

    const overlayFisico = {
      position: 'absolute',
      top: '12%', // mantenemos alto
      left: 0,
      width: '100%',
      // ✅ le damos más espacio para evitar cortes
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '15px 20px 40px 20px', // más padding inferior
      textAlign: 'center',
      color: 'white',
      boxSizing: 'border-box',
    };

    const textStyle = {
      fontSize: isMobile ? '1.2em' : '1em',
      lineHeight: isMobile ? '1.3em' : '1.2em',
      marginBottom: '8px',
		maxWidth: '90%',
	  marginLeft:'-30px'
    };

    const mapButtonStyle = {
      display: 'inline-block',
      border: '1px solid #D8DE3E',
      color: 'white',
      fontSize: isMobile ? '1em' : '1em',
      padding: '1px 9px',
      marginTop: '4px', // leve ajuste para espaciarlo del texto
      textDecoration: 'none',
      transition: '0.3s',
    };

    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          {/* 🔹 Imagen 1: PUNTOS DE VENTA */}
          <div
            style={{
              background: "transparent",
              overflow: "visible",
              width: isMobile ? "100%" : "40%",
            }}
          >
            <img src={ImgTitulo} alt="Puntos de Venta" style={imgTituloStyle} />
          </div>

          {/* 🔹 Imagen 2: FÍSICO */}
          <div style={imgBox}>
            <img src={ImgFisico} alt="Físico" style={baseImgStyle} />
            <div style={overlayFisico}>
              <p
                style={{
                  ...textStyle,
                  textAlign: "left",
                  color: "#D8DE3E",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                ADMINISTRACIÓN
                <br />
                JOCKEY CLUB - RÍO IV
              </p>
              <p style={textStyle}>
                Av. Pres.Perón Oeste 1600-Río IV
                <br />
                Lunes a Viernes de 8 a 17 Hs.
              </p>
              <a
                href="https://share.google/m95kkfz5MVfQfqC1g"
                target="_blank"
                rel="noopener noreferrer"
                style={mapButtonStyle}
              >
                Ver ubicación en Google Maps
              </a>

              <p
                style={{
                  ...textStyle,
                  textAlign: "left",
                  color: "#D8DE3E",
                  fontWeight: "bold",
                  marginTop: "12px",
                }}
              >
                FRIDEZA
              </p>
              <p style={textStyle}>
                Castelli 1926 (mts Ruta A005)
                <br />
                Lunes a Sábados 8 a 20:30 Hs.
                <br />
                Domingos 8 a 13 Hs.
              </p>
              <a
                href="https://maps.app.goo.gl/7T9fnqPsXz4XWmq78"
                target="_blank"
                rel="noopener noreferrer"
                style={mapButtonStyle}
              >
                Ver ubicación en Google Maps
              </a>
              <p
                style={{
                  ...textStyle,
                  textAlign: "left",
                  color: "#D8DE3E",
                  fontWeight: "bold",
                  marginTop: "12px",
                }}
              >
                PASEO RIBERA SHOPPING
              </p>
              <p style={textStyle}>
                Sobremonte 80
                <br />
                Lunes a Sábados 14 a 21:00 Hs.
                <br />
              </p>
              <a
                href="https://maps.app.goo.gl/RFQxoTruB6htGXSA6"
                target="_blank"
                rel="noopener noreferrer"
                style={mapButtonStyle}
              >
                Ver ubicación en Google Maps
              </a>
            </div>
          </div>

          {/* 🔹 Imagen 3: ONLINE */}
          <a
            href="https://qlokura.tv/?QLOKURAFEST=1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...imgBox,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
					<img src={ImgOnline} alt="Online" style={{...baseImgStyle, marginTop:isMobile?'150px':'' }} />
          </a>
        </div>
      </div>
    );
  }
}

export default PuestoVenta;
