import axios from "axios";
import { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import ok from "../assets/sounds/ok.mp3";
import CustomButton from "../components/CustomButton";
export default function QrScanner() {
  const [popup, setPopup] = useState(null);
  const [scanning, setScanning] = useState(false);
  const scanLock = useRef(false);
  const navigate = useNavigate();

  const playSound = (file) => {
    try {
      const audio = new Audio(ok);
      audio.play().catch(() => {});
    } catch (e) {}
  };

  const stopCamera = () => {
    const video = document.querySelector("video");
    if (video && video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const showPopup = (color, text) => {
    setPopup({ color, text });
  };

  const closePopup = () => {
    setPopup(null);
    scanLock.current = false;
  };

  const onScan = async (data) => {
    if (!data || scanLock.current) return;

    scanLock.current = true;

    try {
      const idhash = data;
      console.log(idhash);

      const res = await axios.post(
        "https://p5uq56zbwf.execute-api.us-east-1.amazonaws.com/default/upDateScanQR",
        { idhash },
      );

      const r = res.data;

      if (r.ok) {
        playSound("ok.mp3");
        showPopup("#00c853", `VÁLIDO ✔\nTicket #${r.dni} (${r.tipo})`);
      } else if (r.error === "ENTRADA YA UTILIZADA") {
        playSound("ok.mp3");

        const fecha = r.fechaUso || "";
        const hora = r.horaUso || "";

        showPopup(
          "#d50000",
          `YA UTILIZADO ❌\n${fecha}${hora ? ` · ${hora}` : ""}`,
        );
      } else {
        playSound("ok.mp3");
        showPopup("#ffab00", "NO VALIDO ⚠");
      }
    } catch (e) {
      playSound("ok.mp3");
      showPopup("#ffab00", "ERROR EN SERVIDOR");
    }
  };

  return (
    <div
      style={{
        padding: 20,
        textAlign: "center",
        backgroundColor: "#8800ff",
        width: "100vw",
        height: "100vh",
      }}
    >
      <img src={logo} alt="logo" style={{ width: 280, marginBottom: 20 }} />
      <h2 style={{ color: "#ff6555" }}>SCAN QR</h2>
      {/* SI NO ESTÁ SCANEANDO → START */}
      {!scanning && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            height: "60vh",
            marginTop: "20px",
          }}
        >
          <CustomButton
            title="START SCAN"
            color="#ff6555"
            textColor="#fff"
            onClick={() => {
              scanLock.current = false;
              setScanning(true);
            }}
          />
        </div>
      )}

      {/* SI ESTÁ SCANEANDO → LECTOR + BOTÓN X */}
      {scanning && (
        <>
          <div
            onClick={() => {
              stopCamera(); // ←🔥 APAGA LA CÁMARA
              setScanning(false);
              navigate("/");
            }}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 45,
              height: 45,
              background: "#fff",
              borderRadius: "50%",
              color: "#000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 27,
              fontWeight: "bold",
              boxShadow: "0 0 12px rgba(0,0,0,0.4)",
              cursor: "pointer",
              zIndex: 999999,
            }}
          >
            ✕
          </div>

          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              if (!!result && result.text) {
                onScan(result.text);
              }
            }}
            videoContainerStyle={{ width: "100%", height: "100%" }}
            videoStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </>
      )}

      {/* POPUP */}
      {popup && (
        <div
          onClick={closePopup}
          style={{
            position: "fixed",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            padding: 40,
            background: popup.color,
            color: "#fff",
            borderRadius: 20,
            fontSize: 32,
            textAlign: "center",
            fontWeight: "bold",
            boxShadow: "0 0 35px rgba(0,0,0,0.60)",
            whiteSpace: "pre-line",
            width: "320px",
            height: "320px",
            zIndex: 999999,
            cursor: "pointer",
          }}
        >
          {popup.text}

          <div
            style={{
              marginTop: 30,
              fontSize: 20,
              opacity: 0.9,
              padding: "10px 25px",
              borderRadius: 12,
              display: "inline-block",
            }}
          >
            TOCAR PARA CERRAR
          </div>
        </div>
      )}
    </div>
  );
}
