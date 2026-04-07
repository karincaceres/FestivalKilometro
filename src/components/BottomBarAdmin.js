import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaList, FaCamera, FaSignOutAlt } from "react-icons/fa";

export default function BottomBarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

 const logout = () => {
   // 1. Apagar cámara si está activa
   const video = document.querySelector("video");
   if (video && video.srcObject) {
     video.srcObject.getTracks().forEach((track) => track.stop());
   }

   // 2. Limpiar sesión
   localStorage.clear();
   sessionStorage.clear();

   // 3. Redirigir a pantalla vacía (efecto "app cerrada")
   window.location.href = "about:blank";

   // 4. Intentar cerrar pestaña (funciona en la mayoría de celulares)
   setTimeout(() => {
     window.close();
   }, 200);
 };


  const tabs = [
    { id: "listado", label: "Listado", icon: <FaList />, path: "/TicketsList" },
    { id: "QrScanner", label: "Scan", icon: <FaCamera />, path: "/QrScanner" },
    { id: "logout", label: "Salir", icon: <FaSignOutAlt />, action: logout },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "65px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: "#8800ff",
        backdropFilter: "blur(6px)",
        borderTop: "1px solid #333",
        zIndex: 9999,
      }}
    >
      {tabs.map((t) => (
        <div
          key={t.id}
          onClick={() => (t.path ? navigate(t.path) : t.action())}
          style={{
            flex: 1,
            textAlign: "center",
            color: location.pathname === t.path ? "#ff6555" : "#ddd",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: "1.4rem" }}>{t.icon}</div>
          <div>{t.label}</div>
        </div>
      ))}
    </div>
  );
}
