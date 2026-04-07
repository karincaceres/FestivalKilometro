// src/pages/SplashScreen.js

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/Cargando-horizontal.png";
import backgroundImageR from "../assets/Cargando-vertical.png";
const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // 2 sec splash

    return () => clearTimeout(timer);
  }, [navigate]);

	const min = window.innerWidth >= 1000;
    const back = min ? backgroundImage : backgroundImageR;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      {/* <img src={logo} alt="logo" style={{ width: "250px", marginBottom: 30 }} /> */}
    </div>
  );
};

export default SplashScreen;
