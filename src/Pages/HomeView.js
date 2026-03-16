import React from "react";
import Contacto from "./Contacto.js";
import Evento from "./Evento.js";
import Grilla from "./Grilla.js";
import Header from "./Header.js";
import "./Main.css";
import PuestoVenta from "./PuestoVenta.js";
import SliderHome from "./SliderHome.js";
import Fiesta from "./Fiesta.js";

import EntradaGeneral from "./EntradaGeneral";
import EntradaParking from "./EntradaParking.js";
import EntradaUltraVip from "./EntradaUltraVip.js";
import EntradaVip from "./EntradaVip";

// 🔹 Nuevo import
import Sectores from "./Sectores.js";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: "qlkfest",
    };

    const eventDate = new Date("2025-12-07T19:00:00");
    const finevento = new Date("2025-12-07T23:59:00");

    localStorage.setItem("eventDate", eventDate);
    localStorage.setItem("finevento", finevento);

    // 🔹 Refs
    this.scrollDivQLKFest = React.createRef(); // QLK FEST
    this.scrollDivHome = React.createRef(); // Slider principal
    this.scrollDivevento = React.createRef();
    this.scrollDivGrilla = React.createRef();
    this.scrollDivPuestos = React.createRef();
    this.scrollDivPuntoVenta = React.createRef();
    this.scrollDivInfo = React.createRef();
    this.scrollDivContacto = React.createRef();

    // 🔹 Entradas
    this.scrollEntradaGeneral = React.createRef();
    this.scrollEntradaTribuna = React.createRef();
    this.scrollEntradaBoxes = React.createRef();
    this.scrollEntradaVip = React.createRef();
    this.scrollEntradaParking = React.createRef();

    // 🔹 Nuevo ref Sectores
    this.scrollDivSectores = React.createRef();
  }

  redirect = (name) => {
    const refMap = {
      qlkfest: this.scrollDivQLKFest,
      home: this.scrollDivHome,
      evento: this.scrollDivevento,
      grilla: this.scrollDivGrilla,
      puestos: this.scrollDivPuestos,
      puntoventa: this.scrollDivPuntoVenta,
      info: this.scrollDivInfo,
      contacto: this.scrollDivContacto,

      "entrada-general": this.scrollEntradaGeneral,
      "entrada-tribuna": this.scrollEntradaTribuna,
      "entrada-boxes": this.scrollEntradaBoxes,
      "entrada-vip": this.scrollEntradaVip,
      "entrada-parking": this.scrollEntradaParking,

      // 🔹 Sectores
      sectores: this.scrollDivSectores,
    };

    const ref = refMap[name.toLowerCase()];
    if (ref && ref.current) {
      const headerOffset = window.innerWidth <= 840 ? 0 : 0; // solo aplica en mobile
      const elementPosition =
        ref.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      this.setState({ visible: name.toLowerCase() });
    }
  };

  render() {
    return (
      <div>
        <Header state={this.state.visible} redirect={this.redirect} />

        <div style={{ maxWidth: "100vw" }}>
          {/* 🔹 SliderHome: aparece al hacer click en el logo */}
          <div id="Home" ref={this.scrollDivHome}>
            <SliderHome />
          </div>

          {/* 🔹 QLK FEST */}
          <div id="QLKFEST" ref={this.scrollDivQLKFest}>
            <Fiesta />
          </div>

          {/* 🔹 Grilla */}
          <div id="Grilla" ref={this.scrollDivGrilla}>
            <Grilla />
          </div>

          {/* 🔹 Evento */}
          <div id="Evento" ref={this.scrollDivevento}>
            <Evento redirect={this.redirect.bind(this)} />
          </div>

          {/* 🔹 Entradas */}
          <div id="EntradaGeneral" ref={this.scrollEntradaGeneral}>
            <EntradaGeneral />
          </div>
          <div id="EntradaTribuna" ref={this.scrollEntradaTribuna}>
            <EntradaVip />
          </div>
          <div id="EntradaBoxes" ref={this.scrollEntradaBoxes}>
            <EntradaUltraVip />
          </div>
          <div id="EntradaParking" ref={this.scrollEntradaParking}>
            <EntradaParking />
          </div>

          {/* 🔹 Sectores */}
          <div id="Sectores" ref={this.scrollDivSectores}>
            <Sectores />
          </div>

          {/* 🔹 Puntos de venta */}
          <div id="PuntoVenta" ref={this.scrollDivPuntoVenta}>
            <PuestoVenta />
          </div>

          {/* 🔹 Contacto */}
          <div id="Contacto" ref={this.scrollDivContacto}>
            <Contacto />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
