import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import Background from '../assets/Fondos/fondo1.png';
import BackgroundR from '../assets/Fondos/fondoV.png';

// 🖼️ IMÁGENES DESKTOP (1920x600)
import img1 from '../assets/Slider/1920 x 600/1-1920x600px-general.png';
import img2 from '../assets/Slider/1920 x 600/1-1920x600px.png';
import img3 from '../assets/Slider/1920 x 600/2-1920x600px.png';

import img4 from '../assets/Slider/1920 x 600/4-1920x600px.png';
import img5 from '../assets/Slider/1920 x 600/5-1920x600px.png';
import img6 from '../assets/Slider/1920 x 600/6-1920x600px.png';
import img7 from "../assets/Slider/1920 x 600/7-1920x600px.png";
// 🖼️ IMÁGENES TABLET (1280x400)
import img1M from '../assets/Slider/1280 x 400/1-1280x400px-general.png';
import img2M from '../assets/Slider/1280 x 400/1-1280x400px.png';
import img3M from '../assets/Slider/1280 x 400/2-1280x400px.png';

import img4M from '../assets/Slider/1280 x 400/4-1280x400px.png';
import img5M from '../assets/Slider/1280 x 400/5-1280x400px.png';
import img6M from '../assets/Slider/1280 x 400/6-1280x400px.png';
import img7M from "../assets/Slider/1280 x 400/7-1280x400px.png";
// 🖼️ IMÁGENES MOBILE (500x500)
import img1P from '../assets/Slider/500 x 500/1-500x500px-general1.png';
import img2P from '../assets/Slider/500 x 500/1-500x500px-general2.png';
import img3P from '../assets/Slider/500 x 500/1-500x500px.png';
import img4P from '../assets/Slider/500 x 500/2-500x500px.png';
import img5P from '../assets/Slider/500 x 500/4-500x500px.png';
import img6P from '../assets/Slider/500 x 500/5-500x500px.png';
import img7P from '../assets/Slider/500 x 500/6-500x500px.png';
import img8P from "../assets/Slider/500 x 500/7-500x500px.png";

import Footer from './Footer.js';
import './Main.css';

const SliderHome = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width <= 768;
  const isTablet = windowSize.width > 768 && windowSize.width <= 1280;
  const Back = isMobile ? BackgroundR : Background;

  // 🔹 Selección automática de imágenes según resolución
  let slides = [];

  if (isMobile) {
    slides = [img1P, img2P, img3P, img4P, img5P, img6P, img7P, img8P];
  } else if (isTablet) {
    slides = [img1M, img2M, img3M, img4M, img5M, img6M, img7M];
  } else {
    slides = [img1, img2, img3, img4, img5, img6, img7];
  }

  // 🔹 Alturas base
  const headerHeight = 10; // vh
  const footerHeight = isMobile ? 12 : 25; // vh
  const sliderHeight = 100 - headerHeight - footerHeight;

  const sliderContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: `${sliderHeight}vh`,
    width: '100%',
    overflow: 'hidden',
    marginTop: isMobile ? '10px' : '80px',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    objectPosition: 'center',
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Back})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <div style={sliderContainerStyle}>
        <Carousel
          className="custom-carousel"
          pause="hover"
          indicators={true}
          controls={true}
          interval={4000}
          fade>
          {slides.map((img, index) => (
            <Carousel.Item key={index}>
              <img src={img} alt={`Slide ${index + 1}`} style={imageStyle} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <Footer />
    </div>
  );
};

export default SliderHome;
