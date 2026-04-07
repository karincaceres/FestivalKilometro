import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [dni, setDni] = useState("");
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState(false);

  const recover = async () => {
    if (!dni) {
      setMessage("Ingresá tu DNI");
      return;
    }

    try {
      const res = await axios.post(
        "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/recoverPassword",
        { dni }
      );

      if (res.data.error) {
        setMessage(res.data.error);
        return;
      }

      setPopup(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err);
      setMessage("Error de conexión");
    }
  };

  return (
    <div style={styles.page}>
      <img src={logo} alt="logo" style={styles.logo} />

      <div style={styles.card}>
        <h3>Recuperar contraseña</h3>
        <p style={{ marginBottom: 10 }}>
          Ingresá tu DNI y te enviaremos la contraseña a tu email registrado.
        </p>

        <input
          type="number"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          style={styles.input}
        />

        <button style={styles.mainBtn} onClick={recover}>
          Enviar
        </button>

        {message && <p style={styles.error}>{message}</p>}
      </div>

      {popup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>✔ Email enviado</h3>
            <p>Revisá tu casilla.</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    background: "#dfa66b",
    minHeight: "100vh",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logo: {
    width: 260,
    position: "absolute",
    top: 60,
  },
  card: {
    background: "#fff",
    width: "100%",
    maxWidth: 380,
    padding: 30,
    borderRadius: 16,
    boxShadow: "0 0 12px rgba(0,0,0,0.25)",
    textAlign: "center",
    marginTop: 140,
  },
  input: {
    padding: 12,
    borderRadius: 10,
    width: "100%",
    marginTop: 12,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  mainBtn: {
    background: "#000",
    color: "#fff",
    padding: 14,
    width: "100%",
    borderRadius: 10,
    border: "none",
    marginTop: 20,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: { color: "red", marginTop: 15 },
  popupOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.30)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 250,
    textAlign: "center",
  },
};
