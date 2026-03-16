import { Grid } from "@material-ui/core";
import React from "react";
import LogoZoovet from "../assets/Logos/logo.png";
import menuIcon from "../assets/menu.png";
import "./Main.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      submenuInfo: false,
    };
  }

  getClass = (section) => {
    return this.props.state.toLowerCase() === section.toLowerCase()
      ? "label-header-selected"
      : "label-header-not-selected";
  };

  closeAllMenus = () => {
    this.setState({ menu: false, submenuInfo: false });
  };

  toggleSubmenuInfo = () => {
    const isMobile = window.innerWidth <= 840;
    this.setState((prev) => ({
      submenuInfo: !prev.submenuInfo,
      menu: isMobile ? prev.menu : false,
    }));
  };

  handleRedirect = (section) => {
    this.props.redirect(section);
    this.closeAllMenus();
  };

  handleExternal = (url) => {
    window.open(url, "_blank");
    this.closeAllMenus();
  };

  render() {
    const { menu } = this.state;
    const isMobile = window.innerWidth <= 840;
    const heightscreen = window.innerHeight <= 700;

    return (
      <div
        className="header"
        style={{
          height: heightscreen ? "15vh" : "10vh",
          display: "flex",
          boxShadow: "none",
          position: "fixed",
          left: 0,
          top: 10,
          width: "100vw",
          zIndex: 5000,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* 🔹 Desktop navbar */}
          {!isMobile && (
            <Grid item xs={6} md={10} style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: heightscreen ? "1em" : "1.1em",
                  justifyContent: "space-evenly",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#D8DE3E",
                  height: heightscreen ? "6vh" : "6vh",
                  marginLeft: "10px",
                  width: "100%",
                }}
              >
                {/* 🔸 Fiesta (primera sección) */}
                <button
                  style={{ fontSize: "1.5em" }}
                  onClick={() => this.handleRedirect("QLKFEST")}
                  className={this.getClass("qlkfest")}
                >
                  QLK FEST
                </button>

                {/* 🔸 Menú Desktop */}
                <button
                  onClick={() => this.handleRedirect("Grilla")}
                  className={this.getClass("grilla")}
                >
                  GRILLA
                </button>

                <button
                  onClick={() => this.handleRedirect("Evento")}
                  className={this.getClass("evento")}
                >
                  ENTRADAS
                </button>

                {/* ⭐ Nuevo botón SECTORES Desktop */}
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
                <a
                  href="https://enjoy-producciones.s3.us-east-1.amazonaws.com/pdfs/DDJJ_MENORES.docx.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={this.getClass("puntoventa")}
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                  }}
                >

                    PERMISO

                </a>

                <button
                  onClick={() => this.handleRedirect("Contacto")}
                  className={this.getClass("contacto")}
                >
                  CONTACTO
                </button>
              </div>
            </Grid>
          )}

          {/* 🔹 Logo → lleva a SliderHome */}
          <Grid item xs={2} md={1}>
            <div
              style={{
                position: isMobile ? "relative" : "absolute",
                marginLeft: isMobile ? "100px" : "-100px",
                top: isMobile ? "10px" : "-5px",
                zIndex: 1,
              }}
            >
              <img
                src={LogoZoovet}
                onClick={() => this.handleRedirect("Home")}
                alt="logo"
                style={{
                  cursor: "pointer",
                  width: isMobile ? "150px" : heightscreen ? "15vw" : "70%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </Grid>

          {/* 🔹 Menú hamburguesa mobile */}
          {isMobile && (
            <Grid
              item
              xs={2}
              style={{ textAlign: "right", paddingRight: "20px" }}
            >
              <div
                onClick={() =>
                  this.setState((prev) => ({
                    menu: !prev.menu,
                  }))
                }
              >
                <img
                  alt="menu-icon"
                  src={menuIcon}
                  style={{ width: "40px", cursor: "pointer" }}
                />
              </div>
            </Grid>
          )}

          {/* 🔹 Panel móvil */}
          {isMobile && menu && (
            <Grid
              item
              xs={12}
              sm={12}
              style={{
                position: "absolute",
                top: "90px",
                right: 0,
                width: "260px",
                zIndex: 5500,
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="stretch"
                style={{
                  backgroundColor: "#D8DE3E",
                  padding: "12px",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  color: "#000",
                }}
              >
                <button
                  onClick={() => this.handleRedirect("QLKFEST")}
                  className={this.getClass("qlkfest")}
                  style={{ color: "#000", marginBottom: 8, textAlign: "right" }}
                >
                  QLK FEST
                </button>

                <button
                  onClick={() => this.handleRedirect("Grilla")}
                  className={this.getClass("grilla")}
                  style={{ color: "#000", marginBottom: 8, textAlign: "right" }}
                >
                  GRILLA
                </button>

                <button
                  onClick={() => this.handleRedirect("Evento")}
                  className={this.getClass("evento")}
                  style={{ color: "#000", marginBottom: 8, textAlign: "right" }}
                >
                  ENTRADAS
                </button>

                {/* ⭐ Nuevo botón SECTORES Mobile */}
                <button
                  onClick={() => this.handleRedirect("Sectores")}
                  className={this.getClass("sectores")}
                  style={{ color: "#000", marginBottom: 8, textAlign: "right" }}
                >
                  SECTORES
                </button>

                <button
                  onClick={() => this.handleRedirect("PuntoVenta")}
                  className={this.getClass("puntoventa")}
                  style={{ color: "#000", marginBottom: 8, textAlign: "right" }}
                >
                  PUNTOS DE VENTA
                </button>
                <a
                  href="https://enjoy-producciones.s3.us-east-1.amazonaws.com/pdfs/DDJJ_MENORES.docx.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={this.getClass("puntoventa")}
                  style={{
                    display: "inline-block",
					  textDecoration: "none",
					textAlign:'right',
                  }}
                >
                    PERMISO
                </a>
                <button
                  onClick={() => this.handleRedirect("Contacto")}
                  className={this.getClass("contacto")}
                  style={{ color: "#000", marginTop: 8, textAlign: "right" }}
                >
                  CONTACTO
                </button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default Header;
