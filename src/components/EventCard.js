// src/components/EventCard.js
import React from "react";

export default function EventCard({
  id,
  title,
  date,
  place,
  description,
  banner,
  stock,
  disponibilidad,
  onClick,
}) {
  const agotado = stock === 0 || disponibilidad === 0;

  return (
    <div
      onClick={() => {
        if (!agotado) onClick();
      }}
      style={{
        backgroundColor: "#fff",
        color: "#333",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        textAlign: "center",
        marginBottom: "20px",
        cursor: agotado ? "not-allowed" : "pointer",
        position: "relative",
        opacity: agotado ? 0.55 : 1,
      }}
    >
      {/* Imagen */}
      <div style={{ position: "relative" }}>
        <img
          src={banner}
          alt={title}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />

        {/* 🔥 Overlay SOLD OUT */}
        {agotado && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 20,
            }}
          >
            <span
              style={{
                color: "red",
                fontSize: "2.6rem",
                fontWeight: "900",
                letterSpacing: "2px",
                textShadow: "0 3px 6px rgba(0,0,0,0.6)",
                fontFamily: "Roboto-Black",
              }}
            >
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Texto */}
      <div>
        <h3 style={{ margin: 0, fontSize: "1.2em", fontWeight: "bold" }}>
          {title}
        </h3>
        <p style={{ margin: "8px 0" }}>{description}</p>
        <p style={{ margin: "8px 0", fontSize: "1.2em", fontWeight: "bold" }}>
          {date}
        </p>
        <p style={{ margin: 0, fontWeight: "bold" }}>{place}</p>
      </div>
    </div>
  );
}
