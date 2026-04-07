// src/pages/QLKTicketsList.js
import axios from "axios";
import { useEffect, useState } from "react";

export default function QLKTicketsList() {
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [popup, setPopup] = useState(null);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [filters, setFilters] = useState({
    dni: "",
    tipo: "",
    used: "",
    fechaUso: "",
    horaUso: "",
    nombreAsignado: "",
  });

  // --------------------------------------------------------------------
  // Popup visual
  // --------------------------------------------------------------------
  const showPopup = (msg, color = "#8800ff") => {
    setPopup({ msg, color });

    setTimeout(() => {
      setPopup(null);
    }, 2500);
  };

  // --------------------------------------------------------------------
  // Cargar tickets desde USERSX
  // --------------------------------------------------------------------
  const cargarTickets = async () => {
    const res = await axios.post(
      "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/getTicketsBulk",
    );

    setTickets(res.data);
    setFiltered(res.data);
  };

  useEffect(() => {
    cargarTickets();
  }, []);

  // --------------------------------------------------------------------
  // Guardar nombre asignado
  // --------------------------------------------------------------------
  const guardarNombre = async (t) => {
    const nombre = t._tempName || t.nombreAsignado || "";

    if (!nombre.trim()) {
      showPopup("Ingresá un nombre ❗", "#8800ff");
      return;
    }

    try {
      const res = await axios.post(
        "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/updateTicketAssign",
        {
          id: String(t.id),
          nombreAsignado: nombre,
        },
      );

      if (res.data.ok) {
        showPopup("Nombre guardado ✔", "#00C853");
        cargarTickets();
      } else {
        showPopup("Error al guardar ❌", "#D50000");
      }
    } catch (err) {
      showPopup("Error de servidor ⚠", "#FFAB00");
    }
  };

  // --------------------------------------------------------------------
  // FILTROS
  // --------------------------------------------------------------------
  const applyFilters = () => {
    let f = [...tickets];

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        f = f.filter((row) => {
          const value = String(row[key]).toLowerCase();

          if (key === "used") {
            if (filters.used.toLowerCase() === "si")
              return row.used === 1 || row.used === true;

            if (filters.used.toLowerCase() === "no")
              return row.used === 0 || row.used === false;
          }

          return value.includes(filters[key].toLowerCase());
        });
      }
    });

    setFiltered(f);
  };

  // --------------------------------------------------------------------
  // ORDENAR
  // --------------------------------------------------------------------
  const sortColumn = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sorted = [...filtered].sort((a, b) => {
      let A = a[key] ?? "";
      let B = b[key] ?? "";

      if (key === "used") {
        A = A ? 1 : 0;
        B = B ? 1 : 0;
      } else {
        if (typeof A === "string") A = A.toLowerCase();
        if (typeof B === "string") B = B.toLowerCase();
      }

      if (A < B) return direction === "asc" ? -1 : 1;
      if (A > B) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFiltered(sorted);
  };

  const thStyle = {
    padding: 8,
    cursor: "pointer",
    background: "#222",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 2,
  };

  const filterInput = (key, placeholder = "") => (
    <input
      value={filters[key]}
      placeholder={placeholder}
      onChange={(e) =>
        setFilters({
          ...filters,
          [key]: e.target.value,
        })
      }
      onKeyUp={applyFilters}
      style={{
        width: "90%",
        padding: 4,
        marginTop: 4,
        background: "#333",
        color: "#fff",
        border: "1px solid #444",
        borderRadius: 4,
      }}
    />
  );

  // --------------------------------------------------------------------
  // UI
  // --------------------------------------------------------------------

  return (
    <div
      style={{
        padding: 20,
        color: "#fff",
        backgroundColor: "#8800ff",
        height: "100vh",
      }}
    >
      <h2>Tickets FESTIVAL KM</h2>

      <button
        onClick={cargarTickets}
        style={{
          padding: "10px 20px",
          background: "#8800ff",
          color: "#fff",
          borderRadius: 6,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Actualizar
      </button>

      <p style={{ fontSize: "1rem", marginBottom: 20 }}>
        Tickets en vista: <b>{filtered.length}</b>
      </p>

      <div
        style={{
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "70px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle} onClick={() => sortColumn("dni")}>
                Ticket Nº {filterInput("dni")}
              </th>

              <th style={thStyle} onClick={() => sortColumn("tipo")}>
                Tipo {filterInput("tipo")}
              </th>

              <th style={thStyle}>PDF</th>

              <th style={thStyle} onClick={() => sortColumn("used")}>
                Usado {filterInput("used", "1 / 0")}
              </th>

              <th style={thStyle} onClick={() => sortColumn("fechaUso")}>
                Fecha Uso {filterInput("fechaUso")}
              </th>

              <th style={thStyle} onClick={() => sortColumn("horaUso")}>
                Hora Uso {filterInput("horaUso")}
              </th>

              <th style={thStyle}>Nombre Asignado</th>
              <th style={thStyle}>Guardar</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((t, i) => (
              <tr
                key={i}
                style={{ background: i % 2 === 0 ? "#111" : "#181818" }}
              >
                <td style={{ padding: 8 }}>{t.dni}</td>
                <td style={{ padding: 8 }}>{t.tipo}</td>

                <td style={{ padding: 8 }}>
                  <a
                    href={t.pdf_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#ff6555", fontWeight: "bold" }}
                  >
                    Descargar
                  </a>
                </td>

                <td style={{ padding: 8 }}>
                  {t.used === 1 || t.used === true ? "🟢 Sí" : "⚪ No"}
                </td>

                <td style={{ padding: 8 }}>{t.fechaUso || "-"}</td>
                <td style={{ padding: 8 }}>{t.horaUso || "-"}</td>

                {/* INPUT NOMBRE */}
                <td style={{ padding: 8 }}>
                  <input
                    defaultValue={t.nombreAsignado || ""}
                    onChange={(e) => (t._tempName = e.target.value)}
                    placeholder="Nombre..."
                    disabled={!!t.nombreAsignado} // ← NO DEJA EDITAR SI YA TIENE NOMBRE
                    style={{
                      width: "95%",
                      padding: 4,
                      borderRadius: 4,
                      border: "1px solid #555",
                      background: t.nombreAsignado ? "#444" : "#222",
                      color: "#fff",
                      opacity: t.nombreAsignado ? 0.6 : 1,
                    }}
                  />
                </td>

                {/* GUARDAR */}
                <td style={{ padding: 8 }}>
                  <button
                    onClick={() => guardarNombre(t)}
                    disabled={!!t.nombreAsignado}
                    style={{
                      padding: "6px 12px",
                      background: t.nombreAsignado ? "#555" : "#8800ff",
                      borderRadius: 6,
                      fontWeight: "bold",
                      cursor: t.nombreAsignado ? "not-allowed" : "pointer",
                      color: t.nombreAsignado ? "#999" : "#000",
                    }}
                  >
                    💾
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* POPUP */}
      {popup && (
        <div
          style={{
            position: "fixed",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            background: popup.color,
            color: "#000",
            padding: "18px 30px",
            borderRadius: 12,
            fontWeight: "bold",
            fontSize: "1.2rem",
            boxShadow: "0 0 18px rgba(0,0,0,0.5)",
            zIndex: 999999,
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          {popup.msg}
        </div>
      )}
    </div>
  );
}
