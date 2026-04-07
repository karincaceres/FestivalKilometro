import React from "react";
import Background from "../assets/Fondos/fondo1.png";
import BackgroundR from "../assets/Fondos/fondoV.png";
import tituloExclusive from "../assets/PuntosVentas/tit_4.png";
import fondoMedio from "../assets/titulos/fondo.png";
import "./Main.css";

class EntradaParking extends React.Component {
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
      height: isMobile ? "110vh" : "",
      display: "block",
      objectFit: "cover",
      userSelect: "none",
      pointerEvents: "none",
    };

    const contentStyle = {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: isMobile ? "column-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: isMobile ? "18px" : "18px",
      padding: isMobile ? "20px 18px" : "20px 60px",
	boxSizing: "border-box",
	  marginTop:isMobile?'-75px':""
    };

    const leftStyle = {
      width: isMobile ? "100%" : "52%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: isMobile ? "center" : "flex-end",
      color: "#666",
      fontFamily: "Halogen-Regular",
      marginTop: isMobile ? "0" : "-55px",
      textAlign: isMobile ? "center" : "right",
    };

    const rightStyle = {
      width: isMobile ? "100%" : "28%",
      display: "flex",
      flexDirection: "column",
      alignItems: isMobile ? "center" : "flex-start",
      justifyContent: "center",
      gap: isMobile ? "14px" : "18px",
      marginTop: isMobile ? "0" : "-35px",
    };

    const titleStyle = {
      width: isMobile ? "78%" : "55%",
      maxWidth: isMobile ? "320px" : "470px",
      height: "auto",
      objectFit: "contain",
      display: "block",
    };

    const buttonStyle = {
      backgroundColor: "#ff6555",
      color: "#fff",
      fontFamily: "Halogen-Regular",
      border: "none",
      borderRadius: "999px",
      padding: isMobile ? "7px 18px" : "8px 24px",
      fontSize: isMobile ? "0.85em" : "0.65em",
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "all 0.25s ease",
      boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
    };

    const ulStyle = {
      listStyle: "none",
      padding: 0,
      margin: 0,
      width: isMobile ? "100%" : "92%",
      marginLeft: "auto",
    };

    const liStyle = {
      position: "relative",
      color: "#6c6c6c",
      fontFamily: "Halogen-Regular",
      fontSize: isMobile ? "0.75rem" : ".8rem",
      lineHeight: isMobile ? "1.15" : "0.98",
      marginBottom: isMobile ? "10px" : "4px",
      fontWeight: 600,
      textAlign: isMobile ? "left" : "right",
      paddingRight: isMobile ? "0" : "28px",
      paddingLeft: isMobile ? "26px" : "0",
    };

    const tickStyle = {
      position: "absolute",
      right: isMobile ? "auto" : 0,
      left: isMobile ? 0 : "auto",
      top: 0,
      color: "#ff6d57",
      fontSize: isMobile ? "1.05rem" : "1.3rem",
      lineHeight: 1,
      fontWeight: "bold",
    };


	  const message = `Hola!
Me gustaría recibir información para la compra de mesas en el Exclusive Site – Festival Kilómetro.
Aguardo disponibilidad y valores.`;

    const whatsappHref = `https://wa.me/543516652186?text=${encodeURIComponent(message)}`;


    const handleHover = (e) => {
      e.currentTarget.style.backgroundColor = "#c84d42";
      e.currentTarget.style.transform = "scale(1.04)";
    };

    const handleOut = (e) => {
      e.currentTarget.style.backgroundColor = "#ff6555";
      e.currentTarget.style.transform = "scale(1)";
    };

    return (
      <div style={containerStyle}>
        <div style={middleStyle}>
          <img
            src={fondoMedio}
            alt="Fondo Exclusive Site Ruta 66"
            style={bgStyle}
          />

          <div style={contentStyle}>
            <div style={leftStyle}>
              <ul style={ulStyle}>
                <li
                  style={{
                    fontFamily: "blogh",
                    fontSize: "1.5em",
                    color: "#ff6555",
                  }}
                >
                  Incluye
                </li>
                <li style={liStyle}>
                  <span>
                    Mesa reservada para 12 personas en plataforma premium con
                    vista privilegiada al escenario
                  </span>
                  <span style={tickStyle}>✓</span>
                </li>

                {/* <li style={liStyle}>
                  <span>
                    Sector tipo corral exclusivo y cerrado, que garantiza
                    privacidad y comodidad durante todo el evento
                  </span>
                  <span style={tickStyle}>✓</span>
                </li> */}

                {/* <li style={liStyle}>
                  <span>
                    Accesos VIP exclusivos para ingreso y circulación dentro del
                    predio
                  </span>
                  <span style={tickStyle}>✓</span>
                </li> */}

                {/* <li style={liStyle}>
                  <span>
                    Circuito VIP permanente, permitiendo moverse entre
                    estacionamiento, sector de mesas y servicios sin atravesar
                    zonas generales del festival
                  </span>
                  <span style={tickStyle}>✓</span>
                </li> */}

                <li style={liStyle}>
                  <span>4 accesos a parking exclusivo dentro del predio</span>
                  <span style={tickStyle}>✓</span>
                </li>
                {/* <li style={liStyle}>
                  <span>
                    12 vasos oficiales del festival, diseñados especialmente
                    para esta edición
                  </span>
                  <span style={tickStyle}>✓</span>
                </li>
                <li style={liStyle}>
                  <span>12 key holders exclusivos del festival</span>
                  <span style={tickStyle}>✓</span>
                </li> */}
                <li style={liStyle}>
                  <span>Atención personalizada durante toda la jornada</span>
                  <span style={tickStyle}>✓</span>
                </li>

                <li style={liStyle}>
                  <span>Baños VIP exclusivos</span>
                  <span style={tickStyle}>✓</span>
                </li>

                <li style={liStyle}>
                  <span>Barras premium dentro del sector</span>
                  <span style={tickStyle}>✓</span>
                </li>

                {/* <li style={liStyle}>
                  <span>
                    Bebidas en botellas cerradas (envase original) para mayor
                    comodidad en la mesa
                  </span>
                  <span style={tickStyle}>✓</span>
                </li> */}
                <li style={liStyle}>
                  <span>
                    Monto consumible incluido, con 30% destinado a bebidas
                  </span>
                  <span style={tickStyle}>✓</span>
                </li>
              </ul>
            </div>

            <div style={rightStyle}>
              <img
                src={tituloExclusive}
                alt="Exclusive Site Ruta 66"
                style={titleStyle}
              />

              <button
                style={buttonStyle}
                onMouseOver={handleHover}
                onMouseOut={handleOut}
                onClick={() => {
                  if (window.fbq) {
                    window.fbq("track", "Contact", {
                      content_name: "Exclusive Site Ruta 66",
                      content_category: "Mesas Festival Kilómetro",
                      destination: "WhatsApp",
                    });
                  }

                  window.open(whatsappHref, "_blank", "noopener,noreferrer");
                }}
              >
                Comprar aquí
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EntradaParking;
