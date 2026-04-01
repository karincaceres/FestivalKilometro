import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Main.css";

import slide1 from "../assets/Slider/slide-1.png";
import slide2 from "../assets/Slider/slide-2.png";
import slide3 from "../assets/Slider/slide-3.png";
import mobileSlide1 from "../assets/Slider/mobile-slide-1.png";
import mobileSlide2 from "../assets/Slider/mobile-slide-2.png";
import mobileSlide3 from "../assets/Slider/mobile-slide-3.png";
import mobileSlide4 from "../assets/Slider/mobile-slide-4.png";
import mobileSlide5 from "../assets/Slider/mobile-slide-5.png";

import background_h from "../assets/Fondos/fondo1.png"
import background_v from "../assets/Fondos/fondoV.png"

import Footer from "./Footer.js";
class SliderHome extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768;
    const headerHeight = 80; // purple bar (60px) + subtitle bar (~14px)
    const footerHeight = isMobile ? 160 : 70;
    const sliderHeight = `calc(100vh - ${headerHeight + footerHeight}px)`;

    const desktopSlides = [slide1, slide2, slide3];
    const mobileSlides = [mobileSlide1, mobileSlide2, mobileSlide3, mobileSlide4, mobileSlide5];
    const slides = isMobile ? mobileSlides : desktopSlides;
 	const Back = isMobile ? background_v : background_h;
    return (
      <div style={{ marginTop:headerHeight,  backgroundImage: `url(${Back})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center' , height:'100vh'}}>
        <Carousel
          indicators={isMobile}
          controls={!isMobile}
          interval={4000}
          style={{ height: "100%" }}
        >
          {slides.map((src, i) => (
            <Carousel.Item key={i} style={{ height: sliderHeight }}>
              <img
                src={src}
                alt={`slide-${i + 1}`}
                style={{
                  width: "100%",
                  height: sliderHeight,
                  objectFit: isMobile ? "contain" : "contain",
                  objectPosition: "center",

                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <Footer />
      </div>
    );
  }
}

export default SliderHome;
