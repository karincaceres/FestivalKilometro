import React from "react";
import Background from "../assets/Fondos/fondo1.png";
import BackgroundR from "../assets/Fondos/fondoV.png";
import fondoContacto from "../assets/Botones/fondo_contacto.png";
import tituloContacto from "../assets/Botones/contacto.png";
import textoContacto from "../assets/Botones/texto_1.png";
import botonIG from "../assets/Botones/ig.png";
import botonMail from "../assets/Botones/gmail.png";
import botonWhatsapp from "../assets/Botones/whatsapp.png";


import "./Main.css";

class Contacto extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768;
    const Back = isMobile ? BackgroundR : Background;

    const instagramHref = "https://www.instagram.com/festivalkilometro";
    const mailHref = "https://mail.google.com/mail/?view=cm&fs=1&to=festivalkometro@gmail.com&su=Consulta%20Festival%20Kil%C3%B3metro";
    const whatsappHref = "https://wa.me/543517333333";
    const whatsappNumber = "351 7 333333";

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
      height: "90vh",
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
      gap: isMobile ? "22px" : "34px",
      padding: isMobile ? "20px 18px" : "20px 70px",
      boxSizing: "border-box",
    };

    const leftStyle = {
      width: isMobile ? "100%" : "42%",
      display: "flex",
      alignItems: isMobile ? "center" : "flex-end",
      justifyContent: "center",
      marginTop: isMobile ? "-120px" : "18px",
    };

const rightStyle = {
  width: isMobile ? "100%" : "34%",
  display: "flex",
  flexDirection: "column",
  alignItems: isMobile ? "flex-start" : "flex-start",
  justifyContent: isMobile ? "center" : "flex-start",
  gap: isMobile ? "20px" : "12px",
  marginTop: isMobile ? "50px" : "0",
  paddingLeft: isMobile ? "5px" : "0",
  boxSizing: "border-box",
};

    const titleStyle = {
      width: isMobile ? "78%" : "92%",
      maxWidth: isMobile ? "360px" : "720px",
	  height: "auto",
	  marginTop:'-50px',
      objectFit: "contain",
      display: "block",
    };

    const textStyle = {
      width: isMobile ? "82%" : "92%",
      maxWidth: isMobile ? "420px" : "620px",
      height: "auto",
      objectFit: "contain",
      display: "block",
      marginBottom: isMobile ? "4px" : "10px",
    };

    const linkStyle = {
      display: "inline-block",
      textDecoration: "none",
      transition: "transform 0.25s ease, filter 0.25s ease",
      position: "relative",
    };

    const buttonImgStyle = {
      width: isMobile ? "86%" : "100%",
      maxWidth: isMobile ? "360px" : "520px",
      height: "auto",
      objectFit: "contain",
      display: "block",
      cursor: "pointer",
    };

const whatsappWrapperStyle = {
  position: "relative",
  display: "block",
  width: isMobile ? "86%" : "100%",
  maxWidth: isMobile ? "360px" : "520px",
  marginLeft: 0,
  marginRight: "auto",
};
    const whatsappTextStyle = {
      position: "absolute",
      top: isMobile ? "50%" : "50%",
      left: isMobile ? "44px" : "64px",
      transform: "translateY(-50%)",
      color: "#fff",
      fontSize: isMobile ? "1.2rem" : "1.4rem",
      lineHeight: 1,
      whiteSpace: "nowrap",
      pointerEvents: "none",
    };

    const handleHover = (e) => {
      e.currentTarget.style.transform = "scale(1.03)";
      e.currentTarget.style.filter = "brightness(1.08)";
    };

    const handleOut = (e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.filter = "brightness(1)";
    };

    return (
      <div style={containerStyle}>
        <div style={middleStyle}>
          <img src={fondoContacto} alt="Fondo contacto" style={bgStyle} />

          <div style={contentStyle}>
            <div style={leftStyle}>
              <img src={tituloContacto} alt="Contacto" style={titleStyle} />
            </div>

            <div style={rightStyle}>
              <img
                src={textoContacto}
                alt="Cualquier duda o consulta estamos para ayudarte"
                style={textStyle}
              />

              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseOver={handleHover}
                onMouseOut={handleOut}
              >
                <img src={botonIG} alt="Instagram" style={buttonImgStyle} />
              </a>

              <a
                href={mailHref}
                style={linkStyle}
                onMouseOver={handleHover}
                onMouseOut={handleOut}
              >
							<img src={botonMail} alt="Email" style={{ ...buttonImgStyle , width:'110%'}} />
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseOver={handleHover}
                onMouseOut={handleOut}
              >
                <div style={whatsappWrapperStyle}>
                  <img
                    src={botonWhatsapp}
                    alt="WhatsApp"
                    style={{
                      ...buttonImgStyle,
                      width: "100%",

                    }}
                  />
                  <span style={whatsappTextStyle}>{whatsappNumber}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contacto;
