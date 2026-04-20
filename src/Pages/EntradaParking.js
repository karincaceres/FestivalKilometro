import React from "react";
import Background from "../assets/Fondos/fondo1.png";
import BackgroundR from "../assets/Fondos/fondoV.png";
import tituloExclusive from "../assets/PuntosVentas/tit_4.png";
import fondoMedio from "../assets/titulos/fondo.png";
import botonWhatsapp from "../assets/Botones/whatsapp.png";
import "./Main.css";

class EntradaParking extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768;
    const Back = isMobile ? BackgroundR : Background;

    const message = `Hola! Me gustaría recibir información para la compra de mesas en el Exclusive Site – Festival Kilómetro.`;
    const whatsappHref = `https://wa.me/543516652186?text=${encodeURIComponent(message)}`;

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
      height: isMobile ? "110vh" : "auto",
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
      marginTop: isMobile ? "-75px" : "-70px",
    };

    const leftStyle = {
      width: isMobile ? "100%" : "52%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: isMobile ? "center" : "flex-end",
      color: "#666",
      fontFamily: "Halogen-Regular",
      marginTop: isMobile ? "0" : "-35px",
      textAlign: isMobile ? "center" : "right",
    };

    const rightStyle = {
      width: isMobile ? "100%" : "28%",
      display: "flex",
      flexDirection: "column",
      alignItems: isMobile ? "center" : "flex-start",
      justifyContent: "center",
      gap: isMobile ? "10px" : "12px",
      marginTop: isMobile ? "0" : "-20px",
    };

    const titleStyle = {
      width: isMobile ? "78%" : "58%",
      maxWidth: isMobile ? "320px" : "480px",
      height: "auto",
      objectFit: "contain",
      display: "block",
    };

    const smallTopTextStyle = {
      fontFamily: "Halogen-Regular",
      fontSize: isMobile ? "0.9rem" : "1rem",
      color: "#5f5f5f",
      fontWeight: 700,
      letterSpacing: "0.03em",
      marginBottom: isMobile ? "14px" : "18px",
      textAlign: isMobile ? "center" : "right",
      textTransform: "uppercase",
    };

    const optionListStyle = {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "12px" : "14px",
      width: isMobile ? "100%" : "96%",
      marginLeft: "auto",
    };

    const optionBlockStyle = {
      position: "relative",
      paddingRight: isMobile ? "0" : "26px",
      paddingLeft: isMobile ? "26px" : "0",
      textAlign: isMobile ? "center" : "right",
    };

    const optionTitleOrange = {
      fontFamily: "blogh",
      fontSize: isMobile ? "1.25rem" : "1.8rem",
      color: "#ff6555",
      lineHeight: 1,
      marginBottom: "4px",
      textTransform: "uppercase",
    };

    const optionTitleBlue = {
      fontFamily: "blogh",
      fontSize: isMobile ? "1.2rem" : "1.75rem",
      color: "#69d8ff",
      lineHeight: 1,
      marginBottom: "4px",
      textTransform: "uppercase",
    };

    const optionTitlePurple = {
      fontFamily: "blogh",
      fontSize: isMobile ? "1.05rem" : "1.45rem",
      color: "#6d15ff",
      lineHeight: 1,
      marginBottom: "4px",
      textTransform: "uppercase",
    };

    const optionDescStyle = {
      fontFamily: "Halogen-Regular",
      fontSize: isMobile ? "0.9rem" : "0.95rem",
      color: "#595959",
      lineHeight: 1.1,
      fontWeight: 700,
    };

    const tickStyle = {
      position: "absolute",
      right: isMobile ? "auto" : 0,
      left: isMobile ? 0 : "auto",
      top: isMobile ? "2px" : "4px",
      color: "#ff6d57",
      fontSize: isMobile ? "1rem" : "1.25rem",
      lineHeight: 1,
      fontWeight: "bold",
    };

    const rightTextStyle = {
      fontFamily: "blogh",
      fontSize: isMobile ? "1.1rem" : "1.45rem",
      color: "#ff6555",
      textTransform: "uppercase",
      lineHeight: 1,
      textAlign: isMobile ? "center" : "left",
      marginTop: isMobile ? "0" : "-4px",
    };

    const rightSubTextStyle = {
      fontFamily: "Halogen-Regular",
      fontSize: isMobile ? "0.9rem" : "0.95rem",
      color: "#ff6555",
      fontWeight: 700,
      lineHeight: 1,
      textTransform: "uppercase",
      textAlign: isMobile ? "center" : "left",
      marginTop: "-4px",
    };

    const whatsappLinkStyle = {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      textDecoration: "none",
      color: "#6d15ff",
      fontFamily: "Halogen-Regular",
      fontSize: isMobile ? "1rem" : "1.2rem",
      fontWeight: 700,
      cursor: "pointer",
      marginTop: "2px",
    };

    const whatsappIconStyle = {
      width: isMobile ? "24px" : "28px",
      height: isMobile ? "24px" : "28px",
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
      marginTop: isMobile ? "8px" : "10px",
    };

    const handleHover = (e) => {
      e.currentTarget.style.backgroundColor = "#c84d42";
      e.currentTarget.style.transform = "scale(1.04)";
    };

    const handleOut = (e) => {
      e.currentTarget.style.backgroundColor = "#ff6555";
      e.currentTarget.style.transform = "scale(1)";
    };

    const openWhatsapp = () => {
      if (window.fbq) {
        window.fbq("track", "Contact", {
          content_name: "Exclusive Site Ruta 66",
          content_category: "Mesas Festival Kilómetro",
          destination: "WhatsApp",
        });
      }
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
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
              <div style={smallTopTextStyle}>Tenemos 2 opciones para vos</div>

              <div style={optionListStyle}>
                <div style={optionBlockStyle}>
                  <div style={optionTitleOrange}>Paraje KM Full</div>
                  <div style={optionDescStyle}>
                    Mesa para 12 personas + experiencia VIP completa
                  </div>
                  <div style={optionDescStyle}>
                    Incluye bebidas + beneficios exclusivos
                  </div>
                  <span style={tickStyle}>✓</span>
                </div>

                <div style={optionBlockStyle}>
                  <div style={optionTitleBlue}>Paraje KM Estándar</div>
                  <div style={optionDescStyle}>
                    Mesa para 12 personas + acceso VIP
                  </div>
                  <div style={optionDescStyle}>Sin bebidas</div>
                  <span style={tickStyle}>✓</span>
                </div>

                <div style={optionBlockStyle}>
                  <div style={optionTitlePurple}>Pack Drink VIP</div>
                  <div style={optionDescStyle}>
                    Sumá consumo premium y viví la experiencia completa
                  </div>
                  <span style={tickStyle}>✓</span>
                </div>
              </div>
            </div>

            <div style={rightStyle}>
              <img
                src={tituloExclusive}
                alt="Exclusive Site Ruta 66"
                style={titleStyle}
              />

              <div style={rightTextStyle}>Ya tiene que ser tuya!</div>
              <div style={rightSubTextStyle}>Se van las últimas!</div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                style={whatsappLinkStyle}
                onClick={() => {
                  if (window.fbq) {
                    window.fbq("track", "Contact", {
                      content_name: "Exclusive Site Ruta 66",
                      content_category: "Mesas Festival Kilómetro",
                      destination: "WhatsApp",
                    });
                  }
                }}
              >
                <img
                  src={botonWhatsapp}
                  alt="WhatsApp"
                  style={whatsappIconStyle}
                />
                <span>351 665 2186</span>
              </a>

              <button
                style={buttonStyle}
                onMouseOver={handleHover}
                onMouseOut={handleOut}
                onClick={openWhatsapp}
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
