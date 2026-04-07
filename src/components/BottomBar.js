import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaTicketAlt, FaSignOutAlt } from "react-icons/fa";

export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  const tabs = [
    { id: "home", label: "Inicio", icon: <FaHome />, path: "/Home" },
    {
      id: "tickets",
      label: "Mis Entradas",
      icon: <FaTicketAlt />,
      path: "/misEntradas",
    },
    {
      id: "logout",
      label: "Salir",
      icon: <FaSignOutAlt />,
      action: logout,
    },
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
        background: "rgba(20,20,20,0.85)",
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
            color: location.pathname === t.path && t.path ? "#E3CC90" : "#ddd",
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
