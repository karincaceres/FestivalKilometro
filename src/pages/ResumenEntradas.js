// src/pages/ResumenEntradas.js
import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import logo from "../assets/Logo.png";
import Spinner from "react-js-loader";
import { colors } from "../components";
import "../components/Main.css";

const ResumenEntradas = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [showWalletButton, setShowWalletButton] = useState(false);
  const [loading, setLoading] = useState(false);

  // Datos almacenados
  const evento = localStorage.getItem("idEvento") || "";
  const funcionId = localStorage.getItem("functionId") || "";
  const horaInicioEvento = localStorage.getItem("horaInicioEvento") || "";

  const cantidadesPorTanda = JSON.parse(localStorage.getItem("tandas") || "{}");

  const cantidadTotal = parseInt(localStorage.getItem("cantidad") || "0");
  const precioUnitario = parseFloat(
    localStorage.getItem("precioUnitario") || "0"
  );

	const email = localStorage.getItem("email") || "";
	  const tanda = localStorage.getItem("tanda") || "";
  const dni = localStorage.getItem("dni") || "";
  const importeTotal = parseFloat(localStorage.getItem("importe") || "0");
  const name = localStorage.getItem("name") || "";

  const publicKey = "APP_USR-e6311577-c480-4646-b536-ccdab5406e55";
  const isDesktop = window.innerWidth >= 1000;

  // INIT MP
  useEffect(() => {
    initMercadoPago(publicKey, { locale: "es-AR" });

    const already = localStorage.getItem("pago_iniciado");
    const pref = localStorage.getItem("preferenceId_MP");

    if (already && pref) {
      setPreferenceId(pref);
      setShowWalletButton(true);
    }
  }, []);

  const createPreference = async () => {
    if (localStorage.getItem("pago_iniciado")) return;

    if (cantidadTotal <= 0) {
      alert("No seleccionaste entradas.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        idEvento: evento,
        name,
        title: name,
        email,
        dni,
        functionId: funcionId,
        horaInicioEvento,
        quantity: cantidadTotal,
        price: precioUnitario,
        tandas: cantidadesPorTanda,
		importeTotal,
		tanda
	  };
// console.log(payload)
      // Registrar PENDING
      await axios.post(
        "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/registerVentasSensoria",
        payload
      );

      // Crear preferencia
      const res = await axios.post(
        "https://z5rlwre52f.execute-api.us-east-1.amazonaws.com/default/create_preference",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("preferenceId_MP", res.data.id);
      localStorage.setItem("pago_iniciado", "1");

      setPreferenceId(res.data.id);
      setShowWalletButton(true);
    } catch (err) {
      console.error(err);
      alert("Error iniciando el pago.");
    } finally {
      setLoading(false);
    }
  };

  // Cuando el usuario vuelve al Event, limpiar allí
  const volver = () => {
    sessionStorage.setItem("fromResumen", "1");

    // 🧽 limpiar pago
    localStorage.removeItem("preferenceId_MP");
    localStorage.removeItem("pago_iniciado");

    window.history.back();
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100vw",
        backgroundColor: "#dfa66b",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={logo} alt="logo" style={{ width: 240, marginBottom: 10 }} />

      <div
        style={{
          backgroundColor: "#fff",
          color: "#000",
          padding: 20,
          borderRadius: 10,
          marginTop: "80px",
          maxWidth: isDesktop ? "500px" : "350px",
          width: "90%",
          boxShadow: "6px 8px 8px rgba(0, 0, 0, 1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          CONFIRMA TU COMPRA
        </h2>

        <p>
          <b>Evento:</b> {name}
        </p>
        <p>
          <b>Función:</b> {funcionId}
        </p>
        <p>
          <b>Entradas:</b> {cantidadTotal}
        </p>
        <p>
          <b>Importe total:</b> ${importeTotal.toLocaleString("es-AR")}
        </p>
        <p>
          <b>DNI:</b> {dni}
        </p>
        <p>
          <b>Email:</b> {email}
        </p>

        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          {!showWalletButton && (
            <CustomButton
              title="PAGAR"
              textColor="#000"
              color="#dfa66b"
              onClick={createPreference}
            />
          )}
        </div>

        <button
          onClick={volver}
          style={{
            marginTop: 20,
            background: "none",
            border: "none",
            color: "#555",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          ← Cambiar entradas
        </button>
      </div>

      {showWalletButton && preferenceId && (
        <div style={{ marginTop: 20 }}>
          <Wallet key={preferenceId} initialization={{ preferenceId }} />
          <p style={{ color: "#333", padding: 10, textAlign: "center" }}>
            Tranqui vas a ser redirigido a la plataforma de Mercado Pago
          </p>
        </div>
      )}

      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.8)",
            zIndex: 1000,
          }}
        >
          <Spinner type="spinner-circle" bgColor={colors.FUCSIA} size={80} />
        </div>
      )}
    </div>
  );
};

export default ResumenEntradas;
