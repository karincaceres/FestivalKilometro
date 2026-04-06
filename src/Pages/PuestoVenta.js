import React from "react";
import Background from "../assets/Fondos/fondo1.png";
import BackgroundR from "../assets/Fondos/fondoV.png";
import botonEden from "../assets/PuntosVentas/bot_eden.png";
import iconoFisico from "../assets/PuntosVentas/punto_fisico.png"; // <- ajustá nombre si cambia
import tituloVenta from "../assets/PuntosVentas/tit_venta.png";
import fondoVenta from "../assets/PuntosVentas/venta.png";
import "./Main.css";

class PuestoVenta extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768;
    const Back = isMobile ? BackgroundR : Background;

    const containerStyle = {
      backgroundImage: `url(${Back})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: isMobile ? "110px" : "120px",
      paddingBottom: isMobile ? "130px" : "170px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    };

    const middleStyle = {
      position: "relative",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "calc(50% - 50vw)",
      marginRight: "calc(50% - 50vw)",
    };

    const bgStyle = {
      width: "100vw",
      height: "100vh",
      display: "block",
      objectFit: "cover",
      userSelect: "none",
      pointerEvents: "none",
    };

    const contentStyle = {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: isMobile ? "24px" : "26px",
      padding: isMobile ? "20px 18px" : "20px 46px",
      boxSizing: "border-box",
    };

    const leftStyle = {
      width: isMobile ? "100%" : "36%",
      display: "flex",
      alignItems: "center",
      justifyContent: isMobile ? "center" : "flex-end",
      marginTop: isMobile ? "-200px" : "-150px",
    };

    const centerStyle = {
      width: isMobile ? "100%" : "26%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: isMobile ? "0" : "-150px",
      textAlign: "center",
    };

    const rightStyle = {
      width: isMobile ? "100%" : "24%",
      display: "flex",
      flexDirection: "column",
      alignItems: isMobile ? "center" : "flex-start",
      justifyContent: "center",
      textAlign: isMobile ? "center" : "left",
      marginTop: isMobile ? "0" : "-150px",
    };

    const titleStyle = {
      width: isMobile ? "78%" : "88%",
      maxWidth: isMobile ? "360px" : "620px",
      height: "auto",
      objectFit: "contain",
      display: "block",
    };



    const edenLinkStyle = {
      display: "flex",
      justifyContent: "center",
      width: isMobile ? "100%" : "auto",
      textDecoration: "none",
      transition: "transform 0.25s ease",
    };

    const edenImgStyle = {
      width: isMobile ? "52vw" : "78%",
      maxWidth: isMobile ? "260px" : "360px",
      height: "auto",
      objectFit: "contain",
      display: "block",
      cursor: "pointer",
    };

    const fisicoTopStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: isMobile ? "center" : "flex-start",
      gap: "10px",
      marginBottom: "8px",
      width: "100%",
    };

    const fisicoIconStyle = {
      width: isMobile ? "70px" : "56px",
      height: "auto",
      objectFit: "contain",
      display: "block",
    };

    const fisicoTitleStyle = {
      fontFamily: "Blogh",
      fontSize: isMobile ? "2em" : "1.6em",
      color: "#fff",
      lineHeight: 1,
      textTransform: "uppercase",
    };

    const locationNameStyle = {
      fontFamily: "Blogh",
      fontSize: isMobile ? "1.7em" : "1.35em",
      color: "#63e6ff",
      lineHeight: 1.1,
      marginBottom: "4px",
    };
    const locationNameStyleW = {
      fontFamily: "Blogh",
      fontSize: isMobile ? "1.7em" : "1.7em",
      color: "#FFF",
      lineHeight: 1.1,
      marginBottom: "4px",
    };
    const textStyle = {
      fontFamily: "Halogen-Regular",
      fontSize: isMobile ? "0.88em" : "1em",
      color: "#fff",
      lineHeight: 1.2,
      margin: 0,
    };

    const handleHover = (e) => {
      e.currentTarget.style.transform = "scale(1.04)";
    };

    const handleOut = (e) => {
      e.currentTarget.style.transform = "scale(1)";
    };

    return (
      <div style={containerStyle}>
        <div style={middleStyle}>
          <img src={fondoVenta} alt="Fondo venta de entradas" style={bgStyle} />

          <div style={contentStyle}>
            {/* COLUMNA 1 */}
            <div style={leftStyle}>
              <img
                src={tituloVenta}
                alt="Venta de entradas"
                style={titleStyle}
              />
            </div>

            {/* COLUMNA 2 */}
            <div style={centerStyle}>
              <div style={locationNameStyleW}>DIGITAL</div>

              <a
                href="https://www.edenentradas.ar/event/festival-kilometro-wh"
                target="_blank"
                rel="noopener noreferrer"
                style={edenLinkStyle}
                onMouseOver={handleHover}
                onMouseOut={handleOut}
              >
                <img src={botonEden} alt="EDEN Entradas" style={edenImgStyle} />
              </a>
            </div>

            {/* COLUMNA 3 */}
            {/* COLUMNA 3 */}
            <div style={rightStyle}>
              <a
                href="https://maps.app.goo.gl/cWsSGFoL1MjWwjZGA"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMobile ? "center" : "flex-start",
                  justifyContent: "center",
                  textAlign: isMobile ? "center" : "left",
                  width: "100%",
                  transition: "transform 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseOver={handleHover}
                onMouseOut={handleOut}
              >
                <div style={fisicoTopStyle}>
                  <img
                    src={iconoFisico}
                    alt="Punto de venta físico"
                    style={fisicoIconStyle}
                  />
                  <div style={fisicoTitleStyle}>Físico</div>
                </div>

                <div style={locationNameStyle}>Disquerías EDEN</div>
                <p style={textStyle}>Obispo Trejo 15, subsuelo, local 3</p>
                <p style={textStyle}>Lunes a Viernes de 09:00 a 18:30 hs.</p>
                <p style={textStyle}>Sábados de 09:00 a 13:00 hs.</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PuestoVenta;
