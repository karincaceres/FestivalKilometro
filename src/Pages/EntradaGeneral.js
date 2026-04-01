import React from "react";
import Background from "../assets/Fondos/fondo1.png";
import BackgroundR from "../assets/Fondos/fondoV.png";
import tituloGeneral from "../assets/PuntosVentas/tit_1.png";
import fondoMedio from "../assets/titulos/fondo.png";
import "./Main.css";

class EntradaGeneral extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768;
    const Back = isMobile ? BackgroundR : Background;

    const containerStyle = {
      backgroundImage: `url(${Back})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "FuturaBkBTBook1",
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
      fontFamily: "FuturaBkBTBook1",
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
      fontFamily: "FuturaBkBTBook1",
      gap: isMobile ? "22px" : "26px",
      padding: isMobile ? "20px 18px" : "20px 70px",
      boxSizing: "border-box",
    };

    const leftStyle = {
      width: isMobile ? "100%" : "34%",
      display: "flex",
      flexDirection: "column",
      alignItems: isMobile ? "center" : "flex-end",
      justifyContent: "center",
      gap: isMobile ? "14px" : "18px",
      marginTop: isMobile ? "0" : "-55px",
    };

    const titleStyle = {
      width: isMobile ? "70%" : "55%",
      maxWidth: isMobile ? "280px" : "430px",
      height: "auto",
      objectFit: "contain",
      display: "block",
    };

    const buttonStyle = {
      backgroundColor: "#ff6555",
      color: "#fff",
      fontFamily: "FuturaBkBTBook1",
      border: "none",
      borderRadius: "999px",
      padding: isMobile ? "7px 18px" : "8px 24px",
      fontSize: isMobile ? "0.85em" : "0.65em",
      cursor: "pointer",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      transition: "all 0.25s ease",
      boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
    };

    const rightStyle = {
      width: isMobile ? "100%" : "46%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      color: "#666",
      marginTop: isMobile ? "0" : "-40px",
    };

    const ulStyle = {
      listStyle: "none",
      padding: 0,
      margin: 0,
      width: "100%",
    };

    const liStyle = {
      display: "flex",
      alignItems: "flex-start",
      gap: isMobile ? "8px" : "10px",
      color: "#6c6c6c",
      fontFamily: "FuturaBkBTBook1",
      fontSize: isMobile ? "0.85rem" : "0.8rem",
		textAlign:'left',
      lineHeight: "20px",
    };

    const tickStyle = {
      color: "#ff6d57",
      fontSize: isMobile ? "1.05rem" : "1.4rem",
      lineHeight: 1,
      fontFamily: "FuturaBkBTBook1",
      marginTop: isMobile ? "1px" : "0px",
      flexShrink: 0,
      fontWeight: "bold",
    };

    const handleHover = (e) => {
      e.currentTarget.style.backgroundColor = "#ff6555";
      e.currentTarget.style.color = "#fff";
      e.currentTarget.style.transform = "scale(1.04)";
    };

    const handleOut = (e) => {
      e.currentTarget.style.backgroundColor = "#ff6555";
      e.currentTarget.style.color = "#1c1c1c";
      e.currentTarget.style.transform = "scale(1)";
    };

    return (
      <div style={containerStyle}>
        <div style={middleStyle}>
          <img src={fondoMedio} alt="Fondo General Ruta 8" style={bgStyle} />

          <div style={contentStyle}>
            {/* IZQUIERDA */}
            <div style={leftStyle}>
              <img
                src={tituloGeneral}
                alt="General Ruta 8"
                style={titleStyle}
              />

              <a
                href="https://www.edenentradas.ar/event/festival-kilometro-general"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button
                  style={buttonStyle}
                  onMouseOver={handleHover}
                  onMouseOut={handleOut}
                >
                  Comprar aquí
                </button>
              </a>
            </div>

            {/* DERECHA */}
            <div style={rightStyle}>
              <ul style={ulStyle}>
                <li style={liStyle}>
                  <span style={tickStyle}>✓</span>
                  <span>Ingreso al predio del festival</span>
                </li>

                <li style={liStyle}>
                  <span style={tickStyle}>✓</span>
                  <span>Espacio gastronómico con los mejores food trucks</span>
                </li>

                <li style={liStyle}>
                  <span style={tickStyle}>✓</span>
                  <span>
                    Barras habilitadas en distintos sectores del predio
                  </span>
                </li>

                <li style={liStyle}>
                  <span style={tickStyle}>✓</span>
                  <span>Baños disponibles en diferentes puntos</span>
                </li>

                <li style={liStyle}>
                  <span style={tickStyle}>✓</span>
                  <span>
                    Acceso a las zonas de experiencias con sponsors y marcas
                    aliadas
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EntradaGeneral;
