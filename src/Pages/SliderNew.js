import React from "react";
import { Button } from "@material-ui/core";
import "./Main.css";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../assets/Slider/slide-1.png";
import image2 from "../assets/Slider/slide-2.png";
import image3 from "../assets/Slider/slide-3.png";
import image4 from "../assets/Slider/slide-4.png";
import image1Responsive from "../assets/Slider/mobile-slide-1.png";
import image2Responsive from "../assets/Slider/mobile-slide-2.png";
import image3Responsive from "../assets/Slider/mobile-slide-3.png";
import image4Responsive from "../assets/Slider/mobile-slide-4.png";
import Footer from "./Footer.js";
import iosButton from "../assets/Botones/apple-store.png";
import googleButton from "../assets/Botones/google-play.png";
import spotify from "../assets/Botones/boton-slide-3.png";
import spotifyResponsive from "../assets/Botones/boton-mobile-slide-3.png";


class SliderHome extends React.Component {

    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {

        };
    }

openios = () => {
    window.open("https://apps.apple.com/ar/app/soy-m%C3%A1rquez/id1538481101");
  };

  openandroid = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.sooft.pwa.marquez&pli=1"
    );
  };

  openSpoty = () => {
    window.open("https://spotify.link/jcma5bIF3Db");
  };

    render() {
// eslint-disable-next-line

    const widthScreen = window.innerWidth >= 790;
    const heightscreen = window.innerHeight <= 800 && window.innerWidth >= 1000
    const max = window.innerWidth >= 1400;
    const buttonWidth = max ? "40%" : heightscreen ? "25%" : "30%";

    const  isMobile =  window.innerWidth <= 500;
    // Calcula la altura disponible
    const headerHeight = 120; // Altura del encabezado
    const footerHeight = 200; // Altura del pie de página
    const availableHeight = `calc(100vh - ${headerHeight + footerHeight}px)`;
   // console.log('hererree',heightscreen, isMobile)
    // Define el estilo del contenedor del slider
    const sliderContainerStyle = {
      marginTop: heightscreen? 90:120,
      maxHeight: availableHeight,

    };
        return (
            <>
                <div style={{ width: '100%',  height:  '100vh',marginTop:'-110px',  backgroundRepeat: 'no-repeat',}}>
                      <div style={sliderContainerStyle}> {/* Agrega el estilo de margen superior aquí */}
                            <Carousel  indicators={widthScreen ? false : true} style={{width:'100%',top:'110px', height:availableHeight}}>
                            <Carousel.Item >
                                <img src={isMobile?image1Responsive: image1} alt="Image2" style={{maxWidth:'100%',   width: isMobile ? 'auto' :max?'auto':'auto', height: availableHeight, backgroundSize: 'cover' }}></img>
                            </Carousel.Item>
                            <Carousel.Item >
                                <img src={isMobile?image2Responsive:image2} alt="Image1" style={{ maxWidth:'100%',  width: isMobile ? 'auto' : max?'auto':'auto', height: availableHeight, backgroundSize: 'cover' }}></img>
            <div
                  style={{
                    position: "absolute",
                    bottom: "20%",
                    left: heightscreen ? "5%" :isMobile?'-30%': "5%",
                  }}
                >
                  <Button onClick={this.openios}>
                    <img
                      src={iosButton}
                      alt="iOS"
                      style={{
                        zIndex: 30,
                        width: buttonWidth,
                        cursor: "pointer",
                      }}
                    />
                  </Button>
                  <Button
                    onClick={this.openandroid}
                    style={{ marginLeft: widthScreen ? "-15%" : "" }}
                  >
                    <img
                      src={googleButton}
                      alt="Android"
                      style={{
                        zIndex: 30,
                        width: buttonWidth,
                        marginLeft: widthScreen ? "-30%" : "",
                        cursor: "pointer",
                      }}
                    />
                  </Button>
                </div>

                            </Carousel.Item>
                              <Carousel.Item >
                                <img src={isMobile?image3Responsive:image3} alt="Image1" style={{ maxWidth:'100%',  width: isMobile ? 'auto' : max?'auto':'auto', height: availableHeight, backgroundSize: 'cover' }}></img>
                                  <div
                  style={{
                    position: "absolute",
                    bottom: "15%",
                    left: "10%",
                  }}
                >
                  <Button onClick={this.openSpoty}>
                    <img
                      src={widthScreen ? spotify : spotifyResponsive}
                      alt="Spotify"
                      style={{
                        zIndex: 30,
                        width: max ? "50%" :isMobile?'90%': "40%",
                        cursor: "pointer",
                      }}
                    />
                  </Button>
                </div>
            </Carousel.Item>
                <Carousel.Item >
                    <img src={isMobile?image4Responsive: image4} alt="Image4" style={{maxWidth:'100%',   width: isMobile ? 'auto' :max?'auto':'auto', height: availableHeight, backgroundSize: 'cover' }}></img>
                </Carousel.Item>

            </Carousel>
                                <div style={{marginTop:  0 }}></div>
                    <Footer/>

                    </div>
                    <br></br>
            </div>

            </>
            )


    }


}


export default SliderHome;
