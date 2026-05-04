import React from "react";
import "./Main.css";

import FondoMobile from "../assets/Cargando/Cierre_provisorio_1Mobile.png";
import FondoDesktop from "../assets/Cargando/Cierre_provisorio_1920x600px.png";
import compras from "../assets/Cargando/Bot_gacetilla.png";

class Cargando extends React.Component {
  render() {
    const min = window.innerWidth >= 790;
    const backImg = min ? FondoDesktop : FondoMobile;

    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${backImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Botón Compras */}
        <div
          style={{
            position: "absolute",
            bottom: min ? "12%" : "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <a
            href="https://drive.google.com/file/d/1xKF1nwRBrHRwdcxWESr9DtKoqqIeoohE/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={compras}
              alt="Comprar Entradas"
              style={{
                width: min ? "620px" : "370px",
                display: "block",
              }}
            />
          </a>
        </div>
      </div>
    );
  }
}

export default Cargando;
