// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import logo from "../assets/Logo.png";
import oasisBanner from "../assets/oasis.png";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";

export default function Home() {
  const isDesktop = window.innerWidth >= 1000;
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);

  const formatFecha = (fecha) => {
    if (!fecha) return "";

    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const [y, m, d] = fecha.split("-");
    const dateObj = new Date(Number(y), Number(m) - 1, Number(d));

    return `${diasSemana[dateObj.getDay()]} ${dateObj.getDate()} ${
      meses[dateObj.getMonth()]
    } ${dateObj.getFullYear()}`;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.post(
          "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/getEventsSensoria"
        );

        let lista = [];

        try {
          if (typeof res.data === "string") lista = JSON.parse(res.data);
          else if (Array.isArray(res.data)) lista = res.data;
          else if (res.data?.body) lista = JSON.parse(res.data.body);
        } catch {
          lista = [];
        }

        setEventos(lista);
      } catch (err) {
        console.log("Error al cargar eventos:", err);
      }
    };

    load();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#dfa66b",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* LOGO FIJO */}
      <img
        src={logo}
        alt="logo"
        style={{
          width: "230px",
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
        }}
      />

      {/* CONTENEDOR SCROLL */}
      <div
        style={{
          marginTop: "120px",
          paddingBottom: "110px",
          height: "calc(100vh - 120px)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "Roboto-Black",
            fontSize: "1.8em",
            marginBottom: 20,
            color: "#000",
          }}
        >
          PRÓXIMOS EVENTOS
        </h2>

        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            maxWidth: isDesktop ? "500px" : "350px",
            width: "100%",
            gap: "15px",
            marginBottom: "60px",
          }}
        >
          {eventos.length === 0 ? (
            <p style={{ color: "#fff" }}>Cargando eventos...</p>
          ) : (
            eventos.map((ev) => {
              const safeId = ev.idEvento.replaceAll("/", "-");

              return (
                <EventCard
                  key={ev.idEvento}
                  id={safeId}
                  title={ev.name}
                  description={ev.subtitle || ""}
                  date={formatFecha(ev.fechaEvento)}
                  banner={ev.image1 || oasisBanner}
                  place="CÓRDOBA"
                  stock={ev.stockTotal} // 👈 AQUI
                  disponibilidad={ev.disponibles}
                  onClick={() => {
                    if (ev.stock === 0) return;
                    localStorage.setItem(
                      "eventoSeleccionado",
                      JSON.stringify(ev)
                    );
                    navigate(`/event/${safeId}`, { state: { evento: ev } });
                  }}
                />
              );
            })
          )}
        </div>
      </div>

      {/* BOTTOMBAR */}
      <BottomBar />
    </div>
  );
}
