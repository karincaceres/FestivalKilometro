import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function Register() {
  const navigate = useNavigate();

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [dni, setDni] = useState("");

  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [showPass, setShowPass] = useState(false); // 👁
  const [showPass2, setShowPass2] = useState(false); // 👁

  const [popup, setPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  };

  const register = async () => {
    setErrorMsg("");

    if (
      !first_name ||
      !last_name ||
      !dni ||
      !email ||
      !email2 ||
      !password ||
      !password2
    ) {
      return setErrorMsg("Completa todos los campos.");
    }

    if (!validarEmail(email)) {
      return setErrorMsg("Email inválido.");
    }

    if (email.toLowerCase() !== email2.toLowerCase()) {
      return setErrorMsg("Los emails no coinciden.");
    }

    if (password.length < 6) {
      return setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
    }

    if (password !== password2) {
      return setErrorMsg("Las contraseñas no coinciden.");
    }
	  localStorage.setItem("dni", dni);
	   localStorage.setItem("email", email);
    try {
      await axios.post(
        "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/updateUsersSensoria",
        { first_name, last_name, dni, email, password }
      );

      setPopup(true);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      setErrorMsg("❌ Ese email o DNI ya está registrado.");
    }
  };

  return (
    <div style={styles.page}>
      <img
        src={logo}
        alt="logo"
        style={{
          width: 260,
          marginBottom: 20,
          position: "absolute",
          top: 60,
        }}
      />

      <div style={styles.card}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Crear cuenta</h2>

        {/* Nombre */}
        <label style={styles.label}>Nombre</label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
          style={styles.input}
        />

        {/* Apellido */}
        <label style={styles.label}>Apellido</label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
          style={styles.input}
        />

        {/* DNI */}
        <label style={styles.label}>DNI</label>
        <input
          type="number"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          style={styles.input}
        />

        {/* Email */}
        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        {/* Repetir Email */}
        <label style={styles.label}>Repetir email</label>
        <input
          type="email"
          value={email2}
          onChange={(e) => setEmail2(e.target.value)}
          style={styles.input}
        />

        {/* Password */}
        <label style={styles.label}>Contraseña</label>
        <div style={styles.passwordBox}>
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...styles.input, marginTop: 0, flex: 1 }}
          />
          <span style={styles.eye} onClick={() => setShowPass(!showPass)}>
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Repetir Password */}
        <label style={styles.label}>Repetir contraseña</label>
        <div style={styles.passwordBox}>
          <input
            type={showPass2 ? "text" : "password"}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            style={{ ...styles.input, marginTop: 0, flex: 1 }}
          />
          <span style={styles.eye} onClick={() => setShowPass2(!showPass2)}>
            {showPass2 ? "🙈" : "👁️"}
          </span>
        </div>

        {errorMsg && <p style={styles.error}>{errorMsg}</p>}

        <button onClick={register} style={styles.mainBtn}>
          Crear cuenta
        </button>
      </div>

      {popup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3 style={{ marginBottom: 10 }}>✔ Registro exitoso</h3>
            <p>Redirigiendo al inicio...</p>
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
  },
  card: {
    background: "#fff",
    width: "100%",
    maxWidth: 380,
    padding: 25,
    borderRadius: 18,
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
    color: "#333",
  },
  input: {
    padding: 12,
    borderRadius: 10,
    width: "100%",
    border: "1px solid #ccc",
    fontSize: 16,
  },
  passwordBox: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  eye: {
    marginLeft: 10,
    cursor: "pointer",
    fontSize: 20,
    userSelect: "none",
  },
  mainBtn: {
    background: "#dfa66b",
    color: "#000",
    padding: 14,
    width: "100%",
    borderRadius: 10,
    border: "none",
    marginTop: 25,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
  popupOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    background: "#fff",
    padding: 25,
    borderRadius: 14,
    textAlign: "center",
    width: 260,
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
};
