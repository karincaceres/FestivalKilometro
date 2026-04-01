import React from "react";
import logo from "../assets/Logos/logo.png";
import menuIcon from "../assets/menu.png";
import "./Main.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menu: false };
  }

  getClass = (section) =>
    this.props.state.toLowerCase() === section.toLowerCase()
      ? "label-header-selected"
      : "label-header-not-selected";

  handleRedirect = (section) => {
    if (section.toLowerCase() === "faqs") {
      window.open(
        "https://drive.google.com/file/d/17aH6arRQVVXQtHLg1Qr1UaDhONMc9Ljx/view?usp=sharing",
        "_blank",
      );
      this.setState({ menu: false });
      return;
    }

    this.props.redirect(section);
    this.setState({ menu: false });
  };

  render() {
    const { menu } = this.state;
    const isMobile = window.innerWidth <= 840;

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 5000,
        }}
      >
        <div
          style={{
            backgroundColor: "#8800ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "30px 20px",
            height: "80px",
          }}
        >
          {!isMobile ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                left: "30px",
              }}
            >
              <button
                onClick={() => this.handleRedirect("Grilla")}
                className={this.getClass("grilla")}
              >
                FESTIVAL KM
              </button>
              <button
                onClick={() => this.handleRedirect("Fiesta")}
                className={this.getClass("fiesta")}
              >
                LINE UP
              </button>
              <button
                onClick={() => this.handleRedirect("Evento")}
                className={this.getClass("evento")}
              >
                ENTRADAS
              </button>
              <button
                onClick={() => this.handleRedirect("Sectores")}
                className={this.getClass("sectores")}
              >
                SECTORES
              </button>
              <button
                onClick={() => this.handleRedirect("PuntoVenta")}
                className={this.getClass("puntoventa")}
              >
                PUNTOS DE VENTA
              </button>
              <button
                onClick={() => this.handleRedirect("Contacto")}
                className={this.getClass("contacto")}
              >
                CONTACTO
              </button>
              <button
                onClick={() => this.handleRedirect("FAQs")}
                className={this.getClass("contacto")}
              >
                FAQs
              </button>
            </div>
          ) : (
            <div
              onClick={() => this.setState((p) => ({ menu: !p.menu }))}
              style={{ cursor: "pointer" }}
            >
              <img src={menuIcon} alt="menu" style={{ width: "36px" }} />
            </div>
          )}

          <img
            src={logo}
            alt="Festival Kilómetro"
            onClick={() => this.handleRedirect("Home")}
            style={{
              height: isMobile ? "90px" : "130px",
              cursor: "pointer",
              objectFit: "contain",
              marginTop: "55px",
            }}
          />
        </div>

        {isMobile && menu && (
          <div
            style={{
              position: "absolute",
              top: "87px",
              left: 0,
              width: "230px",
              backgroundColor: "#8800ff",
              borderBottomLeftRadius: 8,
              padding: "12px",
              zIndex: 5500,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {[
              { label: "FESTIVAL KM", key: "Grilla" },
              { label: "LINE UP", key: "Fiesta" },
              { label: "ENTRADAS", key: "Evento" },
              { label: "SECTORES", key: "Sectores" },
              { label: "PUNTOS DE VENTA", key: "PuntoVenta" },
              { label: "CONTACTO", key: "Contacto" },
              { label: "FAQ's", key: "faqs" },
            ].map(({ label, key }) => (
              <button
                key={key}
                onClick={() => this.handleRedirect(key)}
                className={
                  key.toLowerCase() === "faqs"
                    ? "submenu-item"
                    : this.getClass(key.toLowerCase())
                }
                style={{
                  textAlign: "right",
                  color: "#fff",
                  fontFamily: "Blogh",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Header;
