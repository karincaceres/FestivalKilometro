import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Event from "./pages/Event";
import CheckoutResult from "./pages/CheckoutResult";
import SplashScreen from "./pages/SplashScreen";
import ResumenEntradas from "./pages/ResumenEntradas";
import Feedback from "./pages/Feedback";
 // eslint-disable-next-line
import QrScanner from "./pages/QrScanner";
 import BottomBarAdmin from "./components/BottomBarAdmin";


 // eslint-disable-next-line
import TicketsList from "./pages/TicketsList.js";
import MisEntradas from "./pages/MisEntradas.js";
// eslint-disable-next-line
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import "./index.css";
import ForgotPassword from "./pages/ForgotPassword";
import ReactGA from "react-ga4";

ReactGA.initialize("G-F6155HMFRQ");

function AppContent() {


  return (
    <main
      style={{
        margin: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Routes>
        <Route path="/" element={<TicketsList />} />
        {/*}  <Route path="/" element={<QrScanner />} />
         */}
        <Route path="/home" element={<Home />} />
        <Route path="/event/:idEvento" element={<Event />} />
        <Route path="/checkout/:result" element={<CheckoutResult />} />
        <Route path="/resumenEntradas" element={<ResumenEntradas />} />
        <Route path="/MisEntradas" element={<MisEntradas />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/QrScanner" element={<QrScanner />} />
        <Route path="/TicketsList" element={<TicketsList />} />

        {/* <Route path="/scanner" element={<QrScanner />} /> */}
      </Routes>
      <BottomBarAdmin />
    </main>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <Router>
        <SplashScreen />
      </Router>
    );
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}
