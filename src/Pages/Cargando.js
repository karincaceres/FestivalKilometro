import React from "react";
import "./Main.css";

import FondoMobile from "../assets/Cargando/Cargando-vertical.png";
import FondoDesktop from "../assets/Cargando/Cargando-horizontal.png";
import compras from "../assets/Varios/COMPRA.png";

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
            bottom: min ? "22%" : "25%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <a
            href="https://www.edenentradas.ar/event/festival-kilometro-wh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={compras}
              alt="Comprar Entradas"
              style={{
                width: min ? "420px" : "300px",
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
