import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Main.css";
// eslint-disable-next-line
import slide1 from "../assets/Slider/1920 x 600/1_1920x600px.png";
// eslint-disable-next-line
import slide2 from "../assets/Slider/1920 x 600/2_1920x600px.png";
import slide3 from "../assets/Slider/1920 x 600/3_1920x600px.png";
import mobileSlide1 from "../assets/Slider/500 x 500/1_500x500px.png";
import mobileSlide2 from "../assets/Slider/500 x 500/2_500x500px.png";
import mobileSlide3 from "../assets/Slider/500 x 500/3_500x500px.png";
import mobileSlide4 from "../assets/Slider/500 x 500/4_500x500px.png";
import mobileSlide5 from "../assets/Slider/500 x 500/5_500x500px.png";

import background_h from "../assets/Fondos/fondo1.png";
import background_v from "../assets/Fondos/fondoV.png";

class Fiesta extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768;
    const headerHeight = 80;
    const footerHeight = isMobile ? 160 : 70;
    const sliderHeight = `calc(100vh - ${headerHeight + footerHeight}px)`;

    const slides = isMobile
      ? [mobileSlide1, mobileSlide2, mobileSlide3, mobileSlide4, mobileSlide5]
      : [slide3];

    const Back = isMobile ? background_v : background_h;

    return (
      <div
        style={{
          marginTop: 0,
          backgroundImage: `url(${Back})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Carousel
          indicators={isMobile}
          controls={isMobile}
          interval={4000}
          style={{ height: sliderHeight }}
        >
          {slides.map((src, i) => (
            <Carousel.Item
              key={i}
              style={{ height: sliderHeight, marginTop: "80px" }}
            >
              <img
                src={src}
                alt={`slide-${i + 1}`}
                style={{
                  width: "100%",
                  height: sliderHeight,
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div
          style={{
            width: "100%",
            display: "flex",
            marginTop: "50px",
            justifyContent: "center",
            padding: isMobile ? "20px 16px 30px" : "30px 40px 50px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: isMobile ? "100%" : "100%",
              aspectRatio: "16 / 9",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            }}
          >
            <iframe
              width="100%"
              height="100%"
            src="https://www.youtube.com/embed/QX0hToDbFn4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Fiesta;
