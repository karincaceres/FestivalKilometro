import React from "react";
import SectorCelu from "../assets/SectorCelu.png";
import SectorWeb from "../assets/SectorWeb.png";
import Background from "../assets/Fondos/fondo1.png";
import BackgroundR from "../assets/Fondos/fondoV.png";

export default function Sectores() {
  const isMobile = window.innerWidth <= 768;

  const Back = isMobile ? BackgroundR : Background;
  const background = isMobile ? SectorCelu : SectorWeb;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${Back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        display: "flex", // ⭐ para centrar el contenido
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={background}
        alt="sectores"
        style={{
          maxWidth: "90%", // ✔ no rebalsa
          maxHeight: "90vh", // ✔ ocupa grande pero no se sale
          objectFit: "contain", // ✔ mantiene proporción
          display: "block",
        }}
      />
    </div>
  );
}
