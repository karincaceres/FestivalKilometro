import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Main.css";

import slide1 from "../assets/Slider/1920 x 600/1_1920x600px.png";
import slide3 from "../assets/Slider/1920 x 600/3_1920x600px.png";
import slide4 from "../assets/Slider/1920 x 600/4_1920x600px.png";
import mobileSlide1 from "../assets/Slider/500 x 500/1_500x500px.png";
import mobileSlide2 from "../assets/Slider/500 x 500/2_500x500px.png";
import mobileSlide3 from "../assets/Slider/500 x 500/3_500x500px.png";
import mobileSlide4 from "../assets/Slider/500 x 500/4_500x500px.png";
import mobileSlide5 from "../assets/Slider/500 x 500/5_500x500px.png";
import mobileSlide6 from "../assets/Slider/500 x 500/6_500x500px.png";
import mobileSlide7 from "../assets/Slider/500 x 500/7_500x500px.png";
import mobileSlide8 from "../assets/Slider/500 x 500/8_500x500px.png";
import mobileSlide9 from "../assets/Slider/500 x 500/9_500x500px.png";
import mobileSlide10 from "../assets/Slider/500 x 500/10_500x500px.png";
import background_h from "../assets/Fondos/fondo1.png"
import background_v from "../assets/Fondos/fondoV.png"

import Footer from "./Footer.js";
class SliderHome extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768;
    const headerHeight = 80; // purple bar (60px) + subtitle bar (~14px)
    const footerHeight = isMobile ? 160 : 70;
    const sliderHeight = `calc(100vh - ${headerHeight + footerHeight}px)`;

    const desktopSlides = [slide1, slide3, slide4];
    const mobileSlides = [
      mobileSlide1,
      mobileSlide2,
      mobileSlide3,
      mobileSlide4,
      mobileSlide5,
      mobileSlide6,
      mobileSlide7,
      mobileSlide8,
      mobileSlide9,
      mobileSlide10
    ];
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
          style={{ height: "70%" }}
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
