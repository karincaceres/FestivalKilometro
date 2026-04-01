import React from "react";
import fechaImg from "../assets/fecha.png";
import bajadaImg from "../assets/bajada.png";
import Background from "../assets/Fondos/fondo1.png";
import BackgroundR from "../assets/Fondos/fondoV.png";
import "./Main.css";

class Grilla extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768;
    const Back = isMobile ? BackgroundR : Background;

const sectionStyle = {
  width: "100vw",
  minHeight: "100vh",
  backgroundImage: `url(${Back})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: isMobile ? "110px" : "120px",
  paddingBottom: isMobile ? "130px" : "170px",
  paddingLeft: isMobile ? "16px" : "60px",
  paddingRight: isMobile ? "16px" : "60px",
  boxSizing: "border-box",
  overflow: "hidden",
};
    const contentStyle = {
      width: "100%",
      maxWidth: "1400px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "center" : "center",
      justifyContent: "space-between",
      gap: isMobile ? "28px" : "50px",
    };

    const leftStyle = {
      width: isMobile ? "100%" : "40%",
      display: "flex",
      flexDirection: "column",
      alignItems: isMobile ? "center" : "flex-start",
      justifyContent: "center",
      gap: isMobile ? "20px" : "28px",
    };

    const rightStyle = {
      width: isMobile ? "100%" : "60%",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? "18px" : "34px",
      alignItems: "start",
    };

    const textStyle = {
      fontFamily: "FuturaBkBTBook1, sans-serif",
      color: "#ffffff",
      fontSize: isMobile ? "0.9rem" : "0.8rem",
      lineHeight: isMobile ? "1.4" : "1.2",
      textAlign: "left",
      margin: 0,
    };

    const boldStyle = {
      fontFamily: "Blogh",
      fontSize: isMobile ? "1.2rem" : "1.2rem",
      color: "#ffffff",
	};

	      const boldStyleBlue = {
          fontFamily: "FuturaBkBTBook1",
          fontSize: isMobile ? "1rem" : "1rem",
          color: "#000",
        };


    const celesteStyle = {
      color: "#63e6ff",
      fontSize: isMobile ? "1.2rem" : "1.2rem",
      fontFamily: "Blogh",
    };

    return (
      <div style={sectionStyle}>
        <div style={contentStyle}>
          {/* IZQUIERDA */}
          <div style={leftStyle}>
            <img
              src={fechaImg}
              alt="1 de mayo Playa Norte Estadio Kempes"
              style={{
                width: isMobile ? "95%" : "100%",
                maxWidth: isMobile ? "520px" : "640px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <img
              src={bajadaImg}
              alt="Es el comienzo de un recorrido"
              style={{
                width: isMobile ? "88%" : "78%",
                maxWidth: isMobile ? "460px" : "540px",
                height: "auto",
                objectFit: "contain",
                alignSelf: isMobile ? "center" : "flex-start",
                marginLeft: isMobile ? 0 : "20px",
              }}
            />
          </div>

          {/* DERECHA */}
          <div style={rightStyle}>
            <div>
              <p style={textStyle}>
                <span style={boldStyle}>Kilómetro</span> – Donde te lleva la
                música, es un festival que propone vivir la música como un
                recorrido. Un viaje donde cada artista, cada escenario y cada
                momento representan un nuevo kilómetro dentro de una experiencia
                colectiva.
              </p>

              <p
                style={{ ...textStyle, marginTop: isMobile ? "14px" : "22px" }}
              >
                <span style={boldStyle}>Kilómetro</span> es un festival musical
                masivo que reúne en un mismo espacio a algunos de los artistas
                más convocantes del país,{" "}
                <span style={boldStyleBlue}>
                  combinando distintos géneros y públicos en una jornada pensada
                  para
                </span>{" "}
                <span style={boldStyleBlue}>
                  celebrar la diversidad de la música argentina.
                </span>
              </p>
            </div>

            <div>
              <p style={textStyle}>
                Esta primera edición,{" "}
                <span style={boldStyleBlue}>
                  con sede en el Estadio Mario Alberto Kempes
                </span>{" "}
                de Córdoba, el festival propone una producción integral que
                incluye múltiples{" "}
                <span style={celesteStyle}>
                  shows en vivo, espacios gastronómicos, experiencias para el
                  público y activaciones de marca
                </span>{" "}
                diseñadas especialmente para conectar con miles de personas en
                un contexto de entretenimiento y disfrute.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Grilla;
