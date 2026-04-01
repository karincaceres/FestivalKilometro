import React from "react";
import SectorWeb from "../assets/Sectores/SectorWeb.png";
import fondoSectores from "../assets/Sectores/fondo_sectores.png";
import mapaSectores from "../assets/Sectores/mapa.png";
import tituloSectores from "../assets/Sectores/tit_sectores.png";
import Background from "../assets/Fondos/fondo1.png";
import BackgroundR from "../assets/Fondos/fondoV.png";

export default function Sectores() {
  const isMobile = window.innerWidth <= 768;

  const Back = isMobile ? BackgroundR : Background;

  const containerStyle = {
    width: "100%",
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
    boxSizing: "border-box",
    overflow: "hidden",
  };

  const desktopWrapperStyle = {
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
  };

  const desktopImgStyle = {
    width: "100vw",
    maxWidth: "none",
    height: "auto",
    display: "block",
    objectFit: "contain",
    userSelect: "none",
    pointerEvents: "none",
  };

  const mobileWrapperStyle = {
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 0 10px 0",
    boxSizing: "border-box",
  };

  const mobileBoardStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "500px",
  };

  const mobileBgStyle = {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "contain",
    userSelect: "none",
    pointerEvents: "none",
  };
const mobileMapStyle = {
  position: "absolute",
  top: "2%",
  left: "50%",
  transform: "translateX(-50%) scale(1.12)",
  width: "108%",
  height: "auto",
  objectFit: "contain",
  userSelect: "none",
  pointerEvents: "none",
  transformOrigin: "top center",
};

  const mobileTitleStyle = {
    position: "absolute",
    bottom: "6%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "78%",
    height: "auto",
    objectFit: "contain",
    userSelect: "none",
    pointerEvents: "none",
  };

  if (isMobile) {
    return (
      <div style={containerStyle}>
        <div style={mobileWrapperStyle}>
          <div style={mobileBoardStyle}>
            <img
              src={fondoSectores}
              alt="Fondo sectores"
              style={mobileBgStyle}
            />
            <img
              src={mapaSectores}
              alt="Mapa de sectores"
              style={mobileMapStyle}
            />
            <img
              src={tituloSectores}
              alt="Plano de sectores"
              style={mobileTitleStyle}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={desktopWrapperStyle}>
        <img src={SectorWeb} alt="Plano de sectores" style={desktopImgStyle} />
      </div>
    </div>
  );
}
