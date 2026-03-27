import React from "react";
import "./Main.css";

import FondoMobile from "../assets/Cargando/Cargando-vertical.png";
import FondoDesktop from "../assets/Cargando/Cargando-horizontal.png";
// eslint-disable-next-line
import BotonEntradas from "../assets/Cargando/bot_2.png";
// eslint-disable-next-line
import BotonEntradasPC from "../assets/Cargando/bot_2_pc.png";
import BotonIG_cel from "../assets/Cargando/btn_ig.png";
import BotonIG_pc from "../assets/Cargando/btn_ig.png";
import botontiktok from "../assets/Cargando/tk.png";
import backBotton from "../assets/Cargando/fondo_bot.png";

class Cargando extends React.Component {
  render() {
    const min = window.innerWidth >= 790;
    const backImg = min ? FondoDesktop : FondoMobile;
    // eslint-disable-next-line
    const botonEntradas = min ? BotonEntradasPC : BotonEntradas;
    const botonIG = min ? BotonIG_pc : BotonIG_cel;

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
        <div
          style={{
            position: "absolute",
            bottom: min ? "20%" : "20%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: min ? "20px" : "8px",
            textAlign: "center",
            width: min ? "900px" : "390px",
          }}
        >
          <img
            src={backBotton}
            alt=""
            style={{
              position: "absolute",
              width: min ? "60%" : "80%",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          <p
            style={{
              fontSize: min ? "1.3rem" : "1.2rem",
              fontWeight: 600,
              color: "#fff",
              fontFamily: "FuturaHvBTHeavy",
              margin: 0,
              fontStyle: "italic",
              lineHeight: min ? "1.4" : "1.3",
              textShadow: "0px 0px 8px rgba(0,0,0,0.6)",
              position: "relative",
              zIndex: 1,
            }}
          ></p>

          <a
            href="https://www.instagram.com/festivalkilometro/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <img
              src={botonIG}
              alt="Instagram"
              style={{
                width: min ? "200px" : "150px",

              }}
            />
          </a>

          <a
            href="https://www.tiktok.com/@festival.km?_r=1&_t=ZS-94ldULst5ve"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <img
              src={botontiktok}
              alt="TikTok"
              style={{
                width: min ? "170px" : "130px",

              }}
            />
          </a>
        </div>

        <div
          style={{
            position: "absolute",
            ...(min
              ? {
                  top: "5%",
                  right: "3%",
                }
              : {
                  top: "86%",
                  left: "50%",
                  transform: "translateX(-50%)",
                }),
          }}
        >
          {/* <a href="https://qlokura.tv/" target="_blank" rel="noopener noreferrer">
            <img src={botonEntradas} alt="Comprar Entradas" style={{ width: min ? '180px' : '200px' }} />
          </a> */}
        </div>
      </div>
    );
  }
}

export default Cargando;
