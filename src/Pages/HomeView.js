import React from "react";
import Contacto from "./Contacto.js";
import Evento from "./Evento.js";
import Grilla from "./Grilla.js";
import Header from "./Header.js";
import "./Main.css";
import PuestoVenta from "./PuestoVenta.js";
import SliderHome from "./SliderHome.js";
import EntradaGeneral from "./EntradaGeneral";
import EntradaParking from "./EntradaParking.js";
import EntradaUltraVip from "./EntradaUltraVip.js";
import EntradaVip from "./EntradaVip";
import Sectores from "./Sectores.js";
import Fiesta from "./Fiesta.js";
class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: "home" };

    const eventDate = new Date("2026-05-01T18:00:00");
    const finevento = new Date("2026-05-01T23:59:00");
    localStorage.setItem("eventDate", eventDate);
    localStorage.setItem("finevento", finevento);

    this.scrollDivHome = React.createRef();
    this.scrollDivGrilla = React.createRef();
    this.scrollDivevento = React.createRef();
    this.scrollEntradaGeneral = React.createRef();
    this.scrollEntradaTribuna = React.createRef();
    this.scrollEntradaBoxes = React.createRef();
    this.scrollEntradaParking = React.createRef();
    this.scrollDivSectores = React.createRef();
    this.scrollDivPuntoVenta = React.createRef();
	this.scrollDivContacto = React.createRef();
	this.scrollDivFiesta = React.createRef();
  }

  redirect = (name) => {
    const refMap = {
      home: this.scrollDivHome,
      grilla: this.scrollDivGrilla,
      evento: this.scrollDivevento,
      "entrada-general": this.scrollEntradaGeneral,
      "entrada-tribuna": this.scrollEntradaTribuna,
      "entrada-boxes": this.scrollEntradaBoxes,
      "entrada-parking": this.scrollEntradaParking,
      sectores: this.scrollDivSectores,
      puntoventa: this.scrollDivPuntoVenta,
      contacto: this.scrollDivContacto,
      fiesta: this.scrollDivFiesta,
    };

    const ref = refMap[name.toLowerCase()];
    if (ref && ref.current) {
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
      this.setState({ visible: name.toLowerCase() });
    }
  };

  render() {
    return (
      <div>
        <Header state={this.state.visible} redirect={this.redirect} />

        <div style={{ maxWidth: "100vw" }}>
          <div id="Home" ref={this.scrollDivHome}>
            <SliderHome />
          </div>

          <div id="Grilla" ref={this.scrollDivGrilla}>
            <Grilla />
          </div>
          <div id="Fiesta" ref={this.scrollDivFiesta}>
            <Fiesta />
          </div>

          <div id="Evento" ref={this.scrollDivevento}>
            <Evento redirect={this.redirect.bind(this)} />
          </div>

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

          <div id="Sectores" ref={this.scrollDivSectores}>
            <Sectores />
          </div>

          <div id="PuntoVenta" ref={this.scrollDivPuntoVenta}>
            <PuestoVenta />
          </div>

          <div id="Contacto" ref={this.scrollDivContacto}>
            <Contacto />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
