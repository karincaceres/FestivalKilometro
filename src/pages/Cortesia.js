// src/pages/CrearCortesia.js
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/Logo.png";

export default function CrearCortesia() {
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const [eventos, setEventos] = useState([]);
  const [idEvento, setIdEvento] = useState("");
  const [functionId, setFunctionId] = useState("");
  const [tipoPago, setTipoPago] = useState("CORTESIA");
  const [tandaId, setTandaId] = useState("");
  // eslint-disable-next-line
  const [ticketsPrevios, setTicketsPrevios] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [qrList, setQrList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const ticketRefs = useRef({});

  // ----------------------------------------------------------
  // 1. TRAER EVENTOS
  // ----------------------------------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const loginType = localStorage.getItem("loginType");
        const res = await axios.post(
          "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/getEventsSensoria",
          { loginType }
        );

        let lista = [];
        try {
          if (Array.isArray(res.data)) lista = res.data;
          else if (res.data?.body) lista = JSON.parse(res.data.body);
        } catch {}

        if (loginType === "1") {
          lista = lista.filter((ev) => ev.active === "1" || ev.active === "3");
        } else {
          lista = lista.filter((ev) => ev.active === "1");
        }

        lista = lista.map((ev) => ({
          ...ev,
          funciones: (ev.funciones || []).map((f) => ({
            ...f,
            id: String(f.id),
            label: f.label || `Función ${f.id}`,
          })),
        }));

        lista.sort((a, b) => new Date(a.fechaEvento) - new Date(b.fechaEvento));

        setEventos(lista);
      } catch (e) {
        console.log(e);
      }
    };
    load();
  }, []);

  // ----------------------------------------------------------
  // 2. BUSCAR TICKETS EXISTENTES
  // ----------------------------------------------------------
  const buscarTickets = async () => {
    if (!dni) return setMsg("Escribí DNI");

    setMsg("Buscando...");
    setTicketsPrevios([]);

    try {
      if (!idEvento && functionId === "ALL") {
        const res = await axios.post(
          "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/getTicket",
          { dni }
        );
        setTicketsPrevios(res.data);
        return setMsg("");
      }

      const funcionAEnviar = functionId || "ALL";

      const res = await axios.post(
        "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/getTicketsByEvent",
        { idEvento, funcionId: funcionAEnviar }
      );

      const rows = res.data.filter((t) => t.dni === dni);
      setTicketsPrevios(rows);
      setMsg("");
    } catch (e) {
      setMsg("Error buscando tickets.");
    }
  };

  // ----------------------------------------------------------
  // 3. CREAR CORTESÍA / EFECTIVO
  // ----------------------------------------------------------
  const crearCortesia = async () => {
    if (!dni || !email || !idEvento || !functionId)
      return setMsg("Completá todos los campos");

    if (!tandaId) return setMsg("Debés elegir un tipo de ticket (tanda)");

    setLoading(true);
    setMsg("");

    try {
      const eventoSel = eventos.find((e) => e.idEvento === idEvento);
      const funcionSel = eventoSel.funciones.find(
        (f) => String(f.id) === String(functionId)
      );

      const tandaSel = eventoSel.tandas?.find((t) => t.id === tandaId);

      const precioReal =
        tipoPago === "EFECTIVO" ? Number(tandaSel?.price || 0) : 0;

      // -------- NUEVO: payload corregido --------
      const payload = {
        idEvento: eventoSel.idEvento,
        name: eventoSel.name,
        title: eventoSel.name,
        email,
        dni,
        nombre,
        apellido,
        functionId: funcionSel.id,
        horaInicioEvento: eventoSel?.horaInicioEvento || "",
        quantity: cantidad,
        price: precioReal,
        tanda: tandaSel?.label, // <----
        tandaId: tandaSel?.id || "",
        importeTotal: tipoPago === "CORTESIA" ? "CORTESIA" : "EFECTIVO",
		createdBy: localStorage.getItem("dniUser") || "",
		tipoPago
      };

      const res = await axios.post(
        "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/createCortesia",
        payload
      );

      const hashes = res.data.hashes || [];

      const qrGen = [];
      for (let h of hashes) {
        const payloadQR = `SENSORIA|${h}`;
        const qr = await QRCode.toDataURL(payloadQR);
        qrGen.push(qr);
      }

      const entradasFake = hashes.map((h, i) => ({
        hashSeguro: h,
        dni,
        email,
        name: payload.name,
        functionId: funcionSel.label,
        numeroTicket: i + 1,
        cantidadTotal: cantidad,
        precioFuncion: precioReal,
        tanda: payload.tanda,
        importeTotal: payload.importeTotal,
        tipoPago: payload.tipoPago,
      }));

      setEntradas(entradasFake);
      setQrList(qrGen);
    } catch (e) {
      setMsg("Error creando cortesía");
    }

    setLoading(false);
  };

  // ----------------------------------------------------------
  // 4. GENERAR PDF
  // ----------------------------------------------------------
  const generatePDF = async (index) => {
    const element = ticketRefs.current[index];
    if (!element) return;

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.alignItems = "center";
    wrapper.style.padding = "40px";
    wrapper.style.background = "#333";
    wrapper.style.width = element.offsetWidth + 80 + "px";

    const clone = element.cloneNode(true);
    wrapper.appendChild(clone);

    document.body.appendChild(wrapper);

    const canvas = await html2canvas(wrapper, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#333",
      logging: false,
    });

    document.body.removeChild(wrapper);

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdfWidth = 90;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [pdfWidth, pdfHeight],
    });

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`ticket-${dni}_${nombre}_${apellido}.pdf`);
  };

  // ----------------------------------------------------------
  // UI
  // ----------------------------------------------------------
  return (
    <div
      style={{
        padding: 20,
        color: "#fff",
        minHeight: "100vh",
        background: "#333",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Crear Cortesía</h2>

      {/* FORM */}
      <div
        style={{
          background: "#fff",
          color: "#333",
          padding: 20,
          borderRadius: 12,
          width: "90%",
          maxWidth: 500,
          marginTop: 20,
        }}
      >
        <label>Evento + Función</label>

        <button
          onClick={() => {
            setIdEvento("");
            setFunctionId("ALL");
            setTicketsPrevios([]);
          }}
          style={{
            width: "100%",
            padding: 12,
            background: "#333",
            color: "#fff",
            borderRadius: 10,
            marginBottom: 12,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          TODOS LOS EVENTOS
        </button>

        <select
          value={`${idEvento}|${functionId}`}
          onChange={(e) => {
            const [evId, funcId] = e.target.value.split("|");
            setIdEvento(evId);
            setFunctionId(funcId);
          }}
          style={styles.input}
        >
          <option value="">Elegir...</option>

          {eventos.map((ev) => (
            <optgroup key={ev.idEvento} label={ev.name}>
              <option value={`${ev.idEvento}|ALL`}>
                {ev.name} — TODAS LAS FUNCIONES
              </option>

              {ev.funciones.map((f) => (
                <option key={f.id} value={`${ev.idEvento}|${f.id}`}>
                  {ev.name} — {f.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <label>DNI invitado</label>
        <input
          type="number"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          style={styles.input}
        />

        <button onClick={buscarTickets} style={styles.btnSecondary}>
          Buscar Tickets Existentes
        </button>

        <label>Nombre invitado</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={styles.input}
        />

        <label>Apellido invitado</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          style={styles.input}
        />

        <label>Email invitado</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label>Cantidad Tickets</label>
        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          style={styles.input}
        />

        <label>Tipo de pago</label>
        <select
          value={tipoPago}
          onChange={(e) => setTipoPago(e.target.value)}
          style={styles.input}
        >
          <option value="CORTESIA">Cortesía</option>
          <option value="EFECTIVO">Efectivo</option>
        </select>

        {/* TANDA VISIBLE SIEMPRE QUE HAYA EVENTO */}
        {idEvento && (
          <>
            <label>Seleccionar Tipo Ticket</label>
            <select
              value={tandaId}
              onChange={(e) => setTandaId(e.target.value)}
              style={styles.input}
            >
              <option value="">Elegir tanda...</option>

              {eventos
                .find((ev) => ev.idEvento === idEvento)
                ?.tandas?.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label} — ${t.price}
                  </option>
                ))}
            </select>
          </>
        )}

        <button onClick={crearCortesia} style={styles.btnPrimary}>
          GENERAR TICKETS
        </button>
      </div>

      {/* RESULTADOS */}
      {msg && <p style={{ marginTop: 15 }}>{msg}</p>}
      {loading && <p style={{ marginTop: 15 }}>Generando...</p>}

      {entradas.map((t, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "70px",
          }}
        >
          <div
            ref={(el) => (ticketRefs.current[index] = el)}
            style={{
              background: "#dfa66b",
              color: "#333",
              width: "90%",
              maxWidth: 360,
              borderRadius: 18,
              padding: 18,
              marginTop: 25,
              position: "relative",
            }}
          >
            {/* Lengüeta */}
            <div
              style={{
                position: "absolute",
                top: -5,
                left: "50%",
                transform: "translateX(-50%)",
                background: "#333",
                width: 40,
                height: 20,
                borderRadius: "0 0 40px 40px",
              }}
            />

            {/* Logo */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <img src={logo} alt="logo" style={{ width: 160 }} />
            </div>

            <h3 style={{ textAlign: "center" }}>
              {t.tipoPago === "CORTESIA" ? "Cortesía" : "Ticket"} #
              {t.numeroTicket} de {entradas.length}
            </h3>

            {/* QR */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={qrList[index]}
                alt="QR"
                style={{
                  width: 220,
                  borderRadius: 10,
                  border: "4px solid #333",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              />
            </div>

            <p style={{fontFamily:'roboto-Black', marginBottom: "10px" , fontSize:'1.3em'}}>
              <b>DNI:</b> {t.dni}
            </p>
            <p style={{fontFamily:'roboto-Black', marginBottom: "10px" , fontSize:'1.3em'}}>
              <b>Nombre:</b> {nombre} {apellido}
            </p>

            {/* --------- NUEVO BLOQUE INFO PAGO --------- */}
            <div style={{ textAlign: "center", marginTop: 20 }}>
              {/* Tipo pago */}
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.4em",
                  fontFamily: "Roboto-Black",
                  marginBottom: 10,
                }}
              >
                {t.tipoPago === "CORTESIA" ? "CORTESÍA" : "EFECTIVO"}
              </p>

              {/* Siempre mostrar la tanda */}
              <p style={{ marginBottom: "20px" }}>
                <b>Tipo Ticket: </b>
                <b style={{ fontWeight: "bold", fontFamily: "Roboto-Black" }}>
                  {t.tanda}
                </b>
              </p>

     
            </div>

            <p style={{ marginBottom: "10px" }}>
              <b>Evento:</b>
              <b>Tipo Ticket: </b>
              <b style={{ fontWeight: "bold", fontFamily: "Roboto-Black" }}>
                {t.name}
              </b>{" "}
            </p>
            <p>
              <b>Función:</b> {t.functionId}
            </p>

            <p
              style={{
                marginTop: 20,
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              Se controlará DNI de quien compró las entradas
            </p>

            <p
              style={{
                marginTop: 20,
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: "0.6em",
              }}
            >
              En caso de mal clima puede suspenderse y se reintegra por el mismo
              medio de pago.
            </p>
          </div>

          {/* Botón PDF */}
          <div style={{ marginTop: 10, width: "90%", maxWidth: 360 }}>
            <button
              onClick={() => generatePDF(index)}
              style={{
                background: "#dfa66b",
                color: "#333",
                padding: "12px",
                width: "100%",
                borderRadius: 50,
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1.1em",
              }}
            >
              GUARDAR TICKET (PDF)
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ccc",
    marginBottom: 12,
  },
  btnPrimary: {
    background: "#dfa66b",
    border: "none",
    color: "#333",
    padding: 12,
    width: "100%",
    borderRadius: 50,
    fontWeight: "bold",
    marginTop: 10,
    cursor: "pointer",
  },
  btnSecondary: {
    background: "#333",
    border: "none",
    color: "#fff",
    padding: 10,
    width: "100%",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: "20px",
    cursor: "pointer",
  },
};
