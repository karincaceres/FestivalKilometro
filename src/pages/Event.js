// src/pages/Event.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import CustomButton from "../components/CustomButton";
import "../components/Main.css";
import IOSPicker from "../components/IOSPicker";

export default function Event() {
  const navigate = useNavigate();
  const location = useLocation();

  const eventoState =
    location.state?.evento ||
    JSON.parse(localStorage.getItem("eventoSeleccionado") || "null");
  const [errorPopup, setErrorPopup] = useState({ show: false, message: "" });

  const isDesktop = window.innerWidth >= 1000;
  const [soldOutPopup, setSoldOutPopup] = useState(false);

  const [selectedFunction, setSelectedFunction] = useState("");

  const [dni, setDni] = useState(sessionStorage.getItem("fromResumen"));
  const [quantities, setQuantities] = useState({});
  const [availableLocal, setAvailableLocal] = useState(0);

  const [eventData, setEventData] = useState(null);
  const [funciones, setFunciones] = useState([]);
  const [tandas, setTandas] = useState([]);
  const showError = (msg) => {
    setErrorPopup({ show: true, message: msg });
  };
  useEffect(() => {
    localStorage.removeItem("preferenceId_MP");
    localStorage.removeItem("pago_iniciado");
  }, []);

  // ⭐ Si vengo desde Resumen → limpiar cantidades
  useEffect(() => {
    if (sessionStorage.getItem("fromResumen")) {
      sessionStorage.removeItem("fromResumen");

      setQuantities({});
      localStorage.removeItem("tandas");
      localStorage.removeItem("cantidad");
      localStorage.removeItem("cantidad_calculada");
      localStorage.removeItem("precioUnitario");
      localStorage.removeItem("totalBase");
      localStorage.removeItem("serviceCharge");
      localStorage.removeItem("importe");
      localStorage.removeItem("preferenceId_MP");
      localStorage.removeItem("pago_iniciado");
    }
  }, []);

  // Recuperar datos guardados
  useEffect(() => {
    const savedQuantities = localStorage.getItem("tandas");
    if (savedQuantities) setQuantities(JSON.parse(savedQuantities));

    const savedFunction = localStorage.getItem("functionId");
    if (savedFunction) setSelectedFunction(savedFunction);

    const savedDni = localStorage.getItem("dni");
    if (savedDni) setDni(savedDni);
  }, []);

  // Cargar evento
  useEffect(() => {
    if (eventoState) {
      setEventData(eventoState);
      setFunciones(eventoState.funciones || []);
      setTandas(eventoState.tandas || []);
      setAvailableLocal(eventoState.disponibles); // ← nuevo
    }
  }, [eventoState]);
  // 🚨 Mostrar popup si está agotado

  if (!eventoState) {
    return (
      <div style={{ padding: 20, color: "#fff" }}>
        <p>No se encontró el evento seleccionado.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  if (eventData === null) {
    return (
      <div style={{ padding: 20, color: "#fff" }}>
        <p>Cargando datos del evento...</p>
      </div>
    );
  }

  // ⭐ CADA VEZ QUE CAMBIA FUNCIÓN → LIMPIAR TODO
  const handleFunctionChange = (v) => {
    setSelectedFunction(v);

    setQuantities({});
    localStorage.removeItem("tandas");
    localStorage.removeItem("cantidad");
    localStorage.removeItem("cantidad_calculada");
    localStorage.removeItem("precioUnitario");
    localStorage.removeItem("totalBase");
    localStorage.removeItem("serviceCharge");
    localStorage.removeItem("importe");
    localStorage.removeItem("preferenceId_MP");
    localStorage.removeItem("pago_iniciado");

    localStorage.setItem("functionId", v);
  };
  const updateQty = (tandaId, delta, active) => {
    if (!active) return;

    // Si ya no queda stock → solo mostrar popup y frenar
    if (availableLocal <= 0 && delta > 0) {
      setSoldOutPopup(true);
      return;
    }

    setQuantities((prev) => {
      const prevValue = prev[tandaId] || 0;
      const newValue = Math.max(0, prevValue + delta);

      // calcular diferencia real (evita dobles sumas visuales)
      const diff = newValue - prevValue;

      // si intenta sumar más de lo disponible → popup nomás
      if (diff > 0 && availableLocal - diff < 0) {
        setSoldOutPopup(true);
        return prev;
      }

      // actualizar stock local
      setAvailableLocal((current) => current - diff);

      const updated = { ...prev, [tandaId]: newValue };

      localStorage.setItem("tandas", JSON.stringify(updated));
      localStorage.setItem("tandaSeleccionada", tandaId);

      const totalQty = Object.values(updated).reduce((a, b) => a + b, 0);
      localStorage.setItem("cantidad", String(totalQty));
      localStorage.setItem("cantidad_calculada", String(totalQty));

      return updated;
    });
  };

  // Calcular totales
  const total = tandas.reduce((acc, t) => {
    const qty = quantities[t.id] || 0;
    return acc + qty * t.price;
  }, 0);

  const serviceCharge = total * 0.1;
  const totalFinal = total + serviceCharge;

  const totalTickets = Object.values(quantities).reduce((acc, v) => acc + v, 0);

  const precioUnitario =
    totalTickets > 0 ? Number((totalFinal / totalTickets).toFixed(2)) : 0;

  const precioTotal =
    totalTickets > 0 ? Number((total / totalTickets).toFixed(2)) : 0;

  const continuar = () => {
    if (eventData.disponibles === 0) {
      return setSoldOutPopup(true); // abrir popup
    }
    if (!selectedFunction) return showError("Seleccioná una función");
    if (!dni) return showError("Completá el DNI");
    if (totalTickets === 0) return showError("Seleccioná al menos 1 entrada");

    const funcionSeleccionada = funciones.find(
      (f) => f.id === selectedFunction
    );

    const tandaSeleccionada = localStorage.getItem("tandaSeleccionada") || "";

    localStorage.setItem("tanda", tandaSeleccionada);
    localStorage.setItem("precioTotal", precioTotal);
    localStorage.setItem("dni", dni);
    localStorage.setItem("idEvento", eventData.idEvento);
    localStorage.setItem(
      "horaInicioEvento",
      funcionSeleccionada?.horaInicioEvento || ""
    );
    localStorage.setItem("functionId", selectedFunction);
    localStorage.setItem("tandas", JSON.stringify(quantities));
    localStorage.setItem("cantidad", totalTickets.toString());
    localStorage.setItem("cantidad_calculada", totalTickets.toString());
    localStorage.setItem("totalBase", String(total));
    localStorage.setItem("serviceCharge", String(serviceCharge));
    localStorage.setItem("importe", totalFinal.toString());
    localStorage.setItem("precioUnitario", precioUnitario.toString());
    localStorage.setItem("name", eventData.name);

    navigate("/resumenEntradas");
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        backgroundColor: "#dfa66b",
        color: "#fff",
        overflowY: "auto",
        paddingBottom: "120px",
      }}
    >
      <img src={logo} alt="logo" style={{ width: 200, marginBottom: 20 }} />

      <div
        style={{
          backgroundColor: "#333",
          borderRadius: 20,
          padding: 10,
          width: "100%",
          maxWidth: isDesktop ? "500px" : "90%",
          margin: "0 auto",
          marginBottom: "140px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Comprar — {eventData.name}</h2>

        <img
          src={eventData.image1}
          alt="banner"
          style={{
            width: "100%",
            height: 190,
            borderRadius: 12,
            objectFit: "cover",
            marginBottom: 20,
          }}
        />
        <p style={{ marginBottom: "30px", whiteSpace: "pre-line" }}>
          {eventData.description}
        </p>
        <label>Función</label>
        <IOSPicker
          label="Elegir función"
          options={funciones}
          value={selectedFunction}
          onChange={handleFunctionChange}
        />

        {/* <label style={{ marginTop: 15 }}>DNI</label>
        <input
          style={inputStyles}
          type="number"
          value={dni}
          onChange={(e) => {
            setDni(e.target.value);
            localStorage.setItem("dni", e.target.value);
          }}
        /> */}

        <h3 style={{ marginTop: 20 }}>Entradas</h3>

        {tandas.map((t) => {
          const qty = quantities[t.id] || 0;

          return (
            <div
              key={t.id}
              style={{
                background: "#fff",
                color: "#000",
                padding: 15,
                borderRadius: 12,
                opacity: t.active ? 1 : 0.4,
                marginBottom: 15,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b>{t.label}</b>
                <b>${t.price.toLocaleString("es-AR")}</b>
              </div>

              {qty > 0 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <span>Subtotal:</span>
                    <b>${(qty * t.price).toLocaleString("es-AR")}</b>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <span>Service Charge</span>
                    <b>${(qty * t.price * 0.1).toLocaleString("es-AR")}</b>
                  </div>
                </>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  marginTop: 10,
                }}
              >
                <button
                  onClick={() =>
                    updateQty(t.id, -1, t.active && eventData.disponibles > 0)
                  }
                >
                  –
                </button>

                <span style={{ fontSize: 20 }}>{qty}</span>
                <button
                  onClick={() =>
                    updateQty(t.id, +1, t.active && eventData.disponibles > 0)
                  }
                  disabled={availableLocal === 0}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <b>Total Base</b>
          <b>${total.toLocaleString("es-AR")}</b>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <b>Service Charge 10%</b>
          <b>${serviceCharge.toLocaleString("es-AR")}</b>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            marginTop: 10,
          }}
        >
          <b>Total Final</b>
          <b>${totalFinal.toLocaleString("es-AR")}</b>
        </div>
        {soldOutPopup && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: "#fff",
                color: "#000",
                padding: "25px",
                borderRadius: "20px",
                textAlign: "center",
                width: "85%",
                maxWidth: "400px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
              }}
            >
              <h2 style={{ marginBottom: 15 }}>Evento agotado</h2>
              <p style={{ fontSize: 16, marginBottom: 25 }}>
                No quedan entradas disponibles para este evento.
              </p>

              <button
                style={{
                  padding: "12px 18px",
                  borderRadius: 12,
                  backgroundColor: "#dfa66b",
                  color: "#000",
                  border: "none",
                  fontSize: 16,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                Volver al inicio
              </button>
            </div>
          </div>
        )}
        {errorPopup.show && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: "#fff",
                color: "#000",
                padding: "25px",
                borderRadius: "20px",
                textAlign: "center",
                width: "85%",
                maxWidth: "400px",
              }}
            >
              <h2>Aviso</h2>
              <p style={{ marginBottom: 20 }}>{errorPopup.message}</p>

              <button
                style={{
                  padding: "12px 18px",
                  backgroundColor: "#dfa66b",
                  border: "none",
                  borderRadius: 12,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => setErrorPopup({ show: false, message: "" })}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <CustomButton
            title="CONTINUAR"
            onClick={continuar}
            color="#dfa66b"
            textColor="#000"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}
