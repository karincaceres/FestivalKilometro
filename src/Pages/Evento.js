import React from "react";
import "./Main.css";

import fondoDesktop from "../assets/Fondos/fondo1.png";
import fondoMobile from "../assets/Fondos/fondoV.png";
import entradasFull from "../assets/Fondos/Entradas_1920x1080px.png";

import entrada1 from "../assets/Botones/Entradas_1_500x500px.png";
import entrada2 from "../assets/Botones/Entradas_2_500x500px.png";
import entrada3 from "../assets/Botones/Entradas_3_500x500px.png";
import entrada4 from "../assets/Botones/Entradas_4_500x500px.png";

const Evento = ({ redirect }) => {
  const isMobile = window.innerWidth <= 768;

  const containerStyle = {
    minHeight: "100vh",
    backgroundImage: `url(${isMobile ? fondoMobile : fondoDesktop})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: isMobile ? "110px" : "120px",
    paddingBottom: isMobile ? "130px" : "170px",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
  };

  const boardWrapperStyle = {
    position: "relative",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
  };

  const boardImageStyle = {
    width: "100vw",
    height: "auto",
    display: "block",
    objectFit: "cover",
    userSelect: "none",
    pointerEvents: "none",
  };

  const hotspotBase = {
    position: "absolute",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    margin: 0,
  };

  const mobileListStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "18px",
    padding: "0 14px",
    boxSizing: "border-box",
  };

  const mobileButtonStyle = {
    border: "none",
    background: "transparent",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    width: "92%",
    maxWidth: "360px",
    transition: "transform 0.25s ease",
  };

  const mobileImageStyle = {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "contain",
  };

  const handleHover = (e) => {
    e.currentTarget.style.transform = "scale(1.03)";
  };

  const handleOut = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  if (isMobile) {
    return (
      <div style={containerStyle}>
        <div style={mobileListStyle}>
          <button
            style={mobileButtonStyle}
            onClick={() => redirect("entrada-general")}
            onMouseOver={handleHover}
            onMouseOut={handleOut}
            aria-label="Entrada General Ruta 8"
          >
            <img
              src={entrada1}
              alt="Entrada General Ruta 8"
              style={mobileImageStyle}
            />
          </button>

          <button
            style={mobileButtonStyle}
            onClick={() => redirect("entrada-tribuna")}
            onMouseOver={handleHover}
            onMouseOut={handleOut}
            aria-label="VIP Full Standing Ruta 9"
          >
            <img
              src={entrada2}
              alt="VIP Full Standing Ruta 9"
              style={mobileImageStyle}
            />
          </button>

          <button
            style={mobileButtonStyle}
            onClick={() => redirect("entrada-boxes")}
            onMouseOver={handleHover}
            onMouseOut={handleOut}
            aria-label="Ultra VIP Standing Ruta 40"
          >
            <img
              src={entrada3}
              alt="Ultra VIP Standing Ruta 40"
              style={mobileImageStyle}
            />
          </button>

          <button
            style={mobileButtonStyle}
            onClick={() => redirect("entrada-parking")}
            onMouseOver={handleHover}
            onMouseOut={handleOut}
            aria-label="Exclusive Site Ruta 66"
          >
            <img
              src={entrada4}
              alt="Exclusive Site Ruta 66"
              style={mobileImageStyle}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={boardWrapperStyle}>
        <img
          src={entradasFull}
          alt="Tipos de entradas"
          style={boardImageStyle}
        />

        <button
          onClick={() => redirect("entrada-general")}
          onMouseOver={handleHover}
          onMouseOut={handleOut}
          style={{
            ...hotspotBase,
            left: "4.8%",
            top: "24.5%",
            width: "18.5%",
            height: "22%",
          }}
          aria-label="Entrada General Ruta 8"
        />

        <button
          onClick={() => redirect("entrada-tribuna")}
          onMouseOver={handleHover}
          onMouseOut={handleOut}
          style={{
            ...hotspotBase,
            left: "26.8%",
            top: "26.2%",
            width: "21.8%",
            height: "24%",
          }}
          aria-label="VIP Full Standing Ruta 9"
        />

        <button
          onClick={() => redirect("entrada-boxes")}
          onMouseOver={handleHover}
          onMouseOut={handleOut}
          style={{
            ...hotspotBase,
            left: "51.5%",
            top: "24.5%",
            width: "23%",
            height: "24%",
          }}
          aria-label="Ultra VIP Standing Ruta 40"
        />

        <button
          onClick={() => redirect("entrada-parking")}
          onMouseOver={handleHover}
          onMouseOut={handleOut}
          style={{
            ...hotspotBase,
            left: "77.4%",
            top: "18.5%",
            width: "18.5%",
            height: "21.5%",
          }}
          aria-label="Exclusive Site Ruta 66"
        />
      </div>
    </div>
  );
};

export default Evento;
