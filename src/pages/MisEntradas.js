// src/pages/MisEntradas.js
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/Logo.png";

export default function MisEntradas() {
  const dniLocal = localStorage.getItem("dni") || "";
  const [dni, setDni] = useState(dniLocal);
  const [entradas, setEntradas] = useState([]);
  const [qrList, setQrList] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const [loading, setLoading] = useState(false);
  const ticketRefs = useRef({});

  // ---------------------------------------------
  // AUTO-CARGA SI YA HAY DNI EN LOCALSTORAGE
  // ---------------------------------------------
  useEffect(() => {
    if (dniLocal) buscar(dniLocal);
    // eslint-disable-next-line
  }, []);

  // ---------------------------------------------
  // BUSCAR TICKETS DEL DNI
  // ---------------------------------------------
  const buscar = async (dniToSearch = dni) => {
    if (!dniToSearch) return;

    setLoading(true);
    setBuscado(true);

    try {
      const res = await axios.post(
        "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/getTicket",
        { dni: dniToSearch },
        { headers: { "Content-Type": "application/json" } }
      );

      const items = Array.isArray(res.data) ? res.data : [];
      setEntradas(items);

      const qrGen = [];
      for (const t of items) {
        const payload = `SENSORIA|${t.hashSeguro}`;
        const qr = await QRCode.toDataURL(payload);
        qrGen.push(qr);
      }

      setQrList(qrGen);
    } catch (err) {
      console.error(err);
      alert("Error cargando entradas");
    }

    setLoading(false);
  };

  // ---------------------------------------------
  // GENERAR PDF
  // ---------------------------------------------
  const generatePDF = async (index, codigo) => {
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
    pdf.save(`ticket-${codigo}.pdf`);
  };

  // ---------------------------------------------
  // AGRUPAR ENTRADAS POR EVENTO + FUNCIÓN
  // ---------------------------------------------
  const grupos = {};
  entradas.forEach((t) => {
    const key = `${t.idEvento}-${t.functionId}`;
    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(t);
  });

  // ordenar cada grupo
  Object.keys(grupos).forEach((key) => {
    grupos[key].sort((a, b) => {
      if (a.numeroTicket && b.numeroTicket) {
        return a.numeroTicket - b.numeroTicket;
      }
      return (a.hashSeguro || "").localeCompare(b.hashSeguro || "");
    });
  });

  // ---------------------------------------------
  // UI
  // ---------------------------------------------
  return (
    <div
      style={{
        padding: 20,
        color: "#fff",
        minHeight: "100vh",
        background: "#333",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Mis Entradas</h2>

      {/* FORM SOLO SI NO ESTÁ LOGUEADO */}
      {!dniLocal && (
        <div
          style={{
            background: "#fff",
            color: "#333",
            padding: 20,
            borderRadius: 12,
            marginTop: 50,
          }}
        >
          <label>DNI</label>
          <input
            type="number"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1px solid #ccc",
              marginBottom: 10,
              fontSize: 16,
            }}
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />

          <button
            onClick={() => buscar()}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 50,
              background: "#dfa66b",
              color: "#333",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1.1em",
            }}
          >
            BUSCAR ENTRADAS
          </button>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <p style={{ marginTop: 20, textAlign: "center" }}>Buscando...</p>
      )}

      {/* NO HAY */}
      {buscado && !loading && entradas.length === 0 && (
        <p style={{ marginTop: 20 }}>No se encontraron entradas.</p>
      )}

      {/* LISTADO DE ENTRADAS */}
      {entradas.map((t, index) => {
        const groupKey = `${t.idEvento}-${t.functionId}`;
        const grupo = grupos[groupKey] || [];
        const indexInGroup =
          grupo.findIndex((x) => x.hashSeguro === t.hashSeguro) + 1;

        return (
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
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <img src={logo} alt="logo" style={{ width: 160 }} />
              </div>
              {/* NUMERO DE ENTRADA */}
              <h3 style={{ textAlign: "center", fontFamily: "Roboto-Black" }}>
                Entrada #{indexInGroup} de {grupo.length}
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
                    marginTop: "50px",
                  }}
                />
              </div>
              {/* DATOS */}
              <p
                style={{
                  marginTop: "50px",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                }}
              >
                <b style={{ fontWeight: "bold", fontFamily: "Roboto-Black" }}>
                  DNI:
                </b>{" "}
                <b style={{ fontWeight: "bold", fontFamily: "Roboto-Black" }}>
                  {t.dni}
                </b>
              </p>
              <b style={{ fontWeight: "bold", fontFamily: "Roboto-Black" }}>
                Nombre:
              </b>{" "}
              <b style={{ fontWeight: "bold", fontFamily: "Roboto-Black" }}>
                {t.first_name} {t.last_name}
              </b>
              {/* BLOQUE DE TIPO DE PAGO Y TANDA — SIEMPRE SE MUESTRA LA TANDA */}
              <div style={{ textAlign: "center", marginTop: 20 }}>
                {/* Siempre mostrar etiqueta grande si tiene tipoPago */}
                {t.tipoPago && (
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.6em",
                      fontFamily: "Roboto-Black",
                      letterSpacing: "1px",
                    }}
                  >
                    {t.tipoPago}
                  </p>
                )}

                {/* Siempre mostrar la tanda */}
                {t.tanda && (
                  <p style={{ marginBottom: 10 }}>
                    <b>Tipo Ticket: </b>
                    <b style={{ fontFamily: "Roboto-Black" }}>{t.tanda}</b>
                  </p>
                )}

                {/* Si es EFECTIVO, mostrar los importes */}
              </div>
              <p>
                <b>Evento:</b>{" "}
                <b style={{ fontWeight: "bold", fontFamily: "Roboto-Black" }}>
                  {t.name}
                </b>
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
                En caso de que el clima no nos acompañe nos veremos obligados a
                suspender el evento haciendo reintegro por el mismo medio de
                pago.
              </p>
            </div>

            {/* BOTÓN PDF */}
            <div style={{ marginTop: 10, width: "90%", maxWidth: 360 }}>
              <button
                onClick={() =>
                  generatePDF(index, t.codigoPublico || t.hashSeguro)
                }
                style={{
                  background: "#dfa66b",
                  color: "#333",
                  padding: "10px",
                  width: "100%",
                  borderRadius: 50,
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginBottom: 8,
                  fontSize: "1.1em",
                }}
              >
                GUARDAR TICKET (PDF)
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
