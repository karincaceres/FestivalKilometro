// src/pages/Feedback.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/Logo.png";

export default function Feedback() {
  const [tickets, setTickets] = useState([]);
  const [qrList, setQrList] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);
  const dniFromURL = urlParams.get("external_reference");
  const dni = dniFromURL || localStorage.getItem("dni");

  const ticketRefs = useRef({});

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const res = await axios.post(
          "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/getTicket",
          { dni }
        );

        if (Array.isArray(res.data)) {
          setTickets(res.data);

          const generated = [];
          for (const t of res.data) {
            const payload = `SENSORIA|${t.hashSeguro}`;
            const qr = await QRCode.toDataURL(payload);
            generated.push(qr);
          }
          setQrList(generated);
        }
      } catch (e) {
        console.error("Error consultando ticket", e);
      }
    };

    loadTickets();
  }, [dni]);

  if (tickets.length === 0)
    return (
      <h3 style={{ color: "#fff", marginTop: 40 }}>Procesando tu pago...</h3>
    );

  // -------------------------------------------------------
  // GENERAR PDF INDIVIDUAL
  // -------------------------------------------------------
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

  // -------------------------------------------------------
  // GENERAR TODOS LOS PDFs (INDIVIDUALES)
  // -------------------------------------------------------
//   const downloadAllPDFs = async () => {
//     for (let i = 0; i < tickets.length; i++) {
//       await generatePDF(i, tickets[i].codigoPublico || tickets[i].hashSeguro);
//     }
//   };

  // -------------------------------------------------------
  // COMPARTIR TICKET
  // --------------------// eslint-disable-next-line -----------------------------------

  // eslint-disable-next-line
  const shareTicket = async (index) => {
    const element = ticketRefs.current[index];
    if (!element) return;

    // Render ticket
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const img = canvas.toDataURL("image/png");

    // Convertir a blob para dispositivos que sí lo soportan
    const blob = await (await fetch(img)).blob();
    const file = new File([blob], "ticket.png", { type: "image/png" });

    // Si el navegador NO soporta compartir archivos (iPhone mayoría)
    const supportsFiles =
      navigator.canShare && navigator.canShare({ files: [file] });

    try {
      if (navigator.share) {
        if (supportsFiles) {
          // 👉 Android y algunos iPhones modernos: sí soportan files
          await navigator.share({
            title: "Mi Ticket Sensoría",
            text: "Aquí tenés tu ticket",
            files: [file],
          });
        } else {
          // 👉 Compatibilidad universal: compartir solo imagen + texto
          await navigator.share({
            title: "Mi Ticket Sensoría",
            text: "Aquí tenés tu ticket",
            url: img, // esto sí funciona en TODOS los celulares
          });
        }
      } else {
        // Fallback: descarga
        const link = document.createElement("a");
        link.href = img;
        link.download = "ticket.png";
        link.click();
      }
    } catch (err) {
      console.error("Error al compartir:", err);
    }
  };

  return (
    <div
      style={{
        color: "#fff",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {/* <img src={logo} alt="logo" style={{ width: 160, marginBottom: 10 }} /> */}
      <h2 style={{ textAlign: "center" }}>COMPRA CONFIRMADA</h2>
      <p style={{ opacity: 0.8 }}>Mostrá estos tickets en la entrada</p>

      {/* 🔝 BOTÓN DESCARGAR TODOS */}
      {/* <button
        onClick={downloadAllPDFs}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          background: "#dfa66b",
          color: "#000",
          fontWeight: "bold",
          borderRadius: 50,
          border: "none",
          cursor: "pointer",
        }}
      >
        📄 Descargar todos los tickets (PDF)
      </button> */}

      {/* 🔥 TICKETS */}
      {tickets.map((t, index) => (
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
          {/* TICKET SIN BOTONES */}
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
              //   boxShadow: "0 0 15px rgba(255,255,255,0.15)",
            }}
          >
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
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {" "}
              <img
                src={logo}
                alt="logo"
                style={{ width: 160, marginBottom: 10 }}
              />
            </div>
            <h3 style={{ textAlign: "center", fontFamily: "Roboto-Black" }}>
              Entrada #{t.numeroTicket}/{t.cantidadTotal}
            </h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={qrList[index]}
                alt="QR"
                style={{
                  width: 220,
                  margin: "15px auto",
                  borderRadius: 10,
                  border: "4px solid #333",
                  marginTop: "50px",
                }}
              />
            </div>
            <p>
              <b>DNI:</b> {t.dni}
            </p>
            <b>Nombre:</b>{" "}
            <b style={{ fontWeight: "bold", fontFamily: "Roboto-Black" }}>
              {t.first_name} {t.last_name}
            </b>{" "}
            <p>
              <b>Evento:</b>{" "}
              <b style={{ fontWeight: "bold", fontFamily: "Roboto-Black" }}>
                {t.name}
              </b>
            </p>
            {t.tanda && (
              <p style={{ marginBottom: 10 }}>
                <b>Tipo Ticket: </b>
                <b style={{ fontFamily: "Roboto-Black" }}>{t.tanda}</b>
              </p>
            )}
            <p>
              <b>Función:</b> {t.functionId}
            </p>
            <p
              style={{
                marginTop: "20px",
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
              suspender el evento haciendo reintegro por el mismo medio de pago.
            </p>
            {/* <p>
              <b>Fecha y hora:</b> {t.evento}
              {t.horaInicioEvento}
            </p> */}
            {/* <p>
              <b>Tanda:</b> {t.tanda}
            </p> */}
          </div>

          {/* BOTONES */}
          <div
            translate="no"
            style={{ marginTop: 10, width: "90%", maxWidth: 360 }}
          >
            <button
              onClick={() =>
                generatePDF(index, t.codigoPublico || t.hashSeguro)
              }
              style={{
                background: "#dfa66b",
                color: "#333",
                fontWeight: "bold",
                borderRadius: 50,
                padding: "10px",
                width: "100%",
                border: "none",
                cursor: "pointer",
                marginBottom: 8,
                fontSize: "1.1em",
              }}
            >
              GUARDAR TICKET (PDF)
            </button>

            {/* <button
              onClick={() => shareTicket(index)}
              style={{
                background: "#222",
                color: "#fff",
                padding: "10px",
                width: "100%",
                borderRadius: 50,
                border: "1px solid #666",
                cursor: "pointer",
              }}
            >
              🤝 Compartir Ticket
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
}
