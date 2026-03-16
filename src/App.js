import React from 'react';
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { useLocation } from "react-router-dom";
// Tus páginas
import HomeView from './Pages/HomeView';
import Info from './Pages/Info';
import Evento from './Pages/Evento';

import Contacto from './Pages/Contacto';
import PuestoVenta from './Pages/PuestoVenta';
import Grilla from './Pages/Grilla';
import Cargando from './Pages/Cargando';
import Sectores from "./Pages/Sectores";
// Nuevas páginas de entradas
import EntradaGeneral from './Pages/EntradaGeneral';
import EntradaTribuna from './Pages/EntradaParking';
import EntradaBoxes from './Pages/EntradaUltraVip';
import EntradaVip from './Pages/EntradaVip';
import { trackPageView } from "./Pages/analytics";
function App() {
	const location = useLocation();
  const appStyle = {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
  };

 useEffect(() => {
   trackPageView(location.pathname + location.search);
 }, [location]);
  return (
    <Router>
      <div className="App" style={appStyle}>
        <header>
          {/* La pelota animada si querés mantenerla */}
          {/* <div style={ballStyle}></div> */}

          <Switch>
            {/* Rutas principales */}
            <Route exact path="/HomeView" component={HomeView} />
            <Route path="/info" component={Info} />
            <Route path="/evento" component={Evento} /> 
            <Route path="/sectores" component={Sectores} />
            <Route path="/contacto" component={Contacto} />
            <Route path="/puestoventa" component={PuestoVenta} />
            <Route path="/grilla" component={Grilla} />
            <Route path="/" component={Cargando} />

            {/* Rutas de entradas */}
            <Route path="/entrada-general" component={EntradaGeneral} />
            <Route path="/entrada-tribuna" component={EntradaTribuna} />
            <Route path="/entrada-boxes" component={EntradaBoxes} />
            <Route path="/entrada-vip" component={EntradaVip} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
