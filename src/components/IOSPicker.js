import React, { useState } from "react";

export default function IOSPicker({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BOTÓN QUE ABRE EL PICKER */}
      <div
        onClick={() => setOpen(true)}
        style={{
          padding: "10px 10px",
          borderRadius: 12,
          background: "#ffffff",
          color: "#000000",
          border: "1px solid #aaa",
          marginTop: 5,
          marginBottom: "10px",
          fontSize: "1em",
          fontWeight: 500,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span style={{ color: "#000" }}>
          {value ? options.find((o) => o.id === value)?.label : "Seleccionar"}
        </span>
        <span style={{ opacity: 0.8, fontSize: 20 }}>▾</span>
      </div>

      {/* MODAL IOS */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.55)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            animation: "fadeIn .25s ease",
          }}
        >
          {/* CONTENEDOR DEL PICKER */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              background: "#fafafa",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              animation: "slideUp .25s ease",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                textAlign: "center",
                color: "#000",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {label}
            </h3>

            {/* LISTA DE OPCIONES */}
            {options.map((opt) => (
              <div
                key={opt.id}
                onClick={() => {
                  onChange(opt.id);
                  setOpen(false);
                }}
                style={{
                  padding: 16,
                  fontSize: 20,
                  fontWeight: 500,
                  textAlign: "center",
                  borderBottom: "1px solid #ddd",
                  color: "#000",
                  cursor: "pointer",
                  marginBottom: 100,
                }}
              >
                {opt.label}
              </div>
            ))}

            {/* BOTÓN CANCELAR */}
            <div
              onClick={() => setOpen(false)}
              style={{
                padding: 15,
                marginTop: 12,
                textAlign: "center",
                background: "#fff",
                color: "#007AFF",
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancelar
            </div>
          </div>
        </div>
      )}

      {/* Animaciones */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }

          @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </>
  );
}
