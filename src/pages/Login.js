import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png"; // ← agregado

export default function Login() {
  const navigate = useNavigate();

  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState(false);

  const login = async () => {
    setMessage("");

    if (!dni || !password) {
      setMessage("Ingresá DNI y contraseña");
      return;
    }

    try {
      const res = await axios.post(
        "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/loginSensoria",
        { dni, password }
      );

      const data = res.data;

      if (data.error) {
        setMessage(data.error);
        return;
      }

      // Guardar datos
	localStorage.setItem("dni", data.dni);
	localStorage.setItem("dniUser", data.dni);
      localStorage.setItem("first_name", data.first_name || "");
      localStorage.setItem("last_name", data.last_name || "");
	  localStorage.setItem("email", data.email || "");
	  localStorage.setItem("loginType", data.loginType);


      setPopup(true);

      setTimeout(() => {
        // ⭐ Limpiar cualquier compra previa
        localStorage.removeItem("tandas");
        localStorage.removeItem("cantidad");
        localStorage.removeItem("cantidad_calculada");
        localStorage.removeItem("precioUnitario");
        localStorage.removeItem("totalBase");
        localStorage.removeItem("serviceCharge");
        localStorage.removeItem("importe");
        localStorage.removeItem("tandaSeleccionada");
        localStorage.removeItem("functionId");
        localStorage.removeItem("pago_iniciado");
		  localStorage.removeItem("preferenceId_MP");

		  if (data.loginType === '1') {
			  navigate("/TicketsList");
		}else{ navigate("/home");}

      }, 1500);
    } catch (err) {
      console.log(err);
      setMessage("Error de conexión");
    }
  };

  return (
    <div style={styles.page}>
      {/* LOGO ARRIBA */}
      <img
        src={logo}
        alt="logo"
        style={{
          width: 280,
          marginBottom: 20,
          position: "absolute",
          top: 60,
        }}
      />

      <div style={styles.card}>
        <h2 style={styles.title}>Ingresar</h2>

        <input
          type="number"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.mainBtn} onClick={login}>
          Entrar
        </button>

        <p style={styles.link} onClick={() => navigate("/register")}>
          Crear una cuenta
        </p>
        <p style={styles.link} onClick={() => navigate("/forgot")}>
          ¿Olvidaste tu contraseña?
        </p>

        {message && <p style={styles.error}>{message}</p>}
      </div>

      {/* POPUP */}
      {popup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>✔ Acceso correcto</h3>
            <p>Ingresando...</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    background: "#333",
    minHeight: "100vh",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  card: {
    background: "#fff",
    width: "100%",
    maxWidth: 380,
    padding: 30,
    borderRadius: 16,
    boxShadow: "0 0 12px rgba(0,0,0,0.25)",
    textAlign: "center",
    marginTop: 140, // para que el logo no tape el card
  },
  title: { marginBottom: 20 },
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
  link: {
    marginTop: 20,
    color: "#333",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: 14,
  },
  error: {
    color: "red",
    marginTop: 15,
  },
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
