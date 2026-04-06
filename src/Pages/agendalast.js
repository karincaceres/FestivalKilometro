import PropTypes from "prop-types";
import React from "react";

import { Grid } from "@material-ui/core";

import Background from "../assets/Fondos/fondo3_1080x1920.jpg";
import liner from "../assets/Fondos/linetit-01S.png";
import Header from "./Header.js";
import "./Main.css";

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {};
  }

  pdf() {
    window.open(
      "https://publiceventsenjoy.s3.amazonaws.com/saber+mas-pdf.pdf",
      "_blank"
    );
  }

  render() {
    const min = window.innerWidth >= 1400;
    const mincel = window.innerWidth <= 500;
    const mid = (window.innerWidth > 1000) & (window.innerWidth < 1400);

    var back = Background;

    const height2 = window.innerHeight - 90;
    return (
      <div style={{ width: "100%", height: height2, flexDirection: "row" }}>
        <Grid
          item
          sm={12}
          xs={12}
          md={12}
          lg={12}
          style={{
            width: "100%",
            height: height2,
            backgroundImage: `url(${back})`,
            backgroundSize: "cover",
            marginRight: 0,
          }}
        >
          <Grid container direction="row" style={{ width: "100%" }}>
            <Grid item sm={12} xs={12} md={6} style={{}}>
              <Grid
                container
                direction="column"
                alignItems={min ? "flex-start" : "center"}
                style={{
                  marginTop: mid ? "15%" : "20%",
                  width: "100%",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    marginTop: min ? "1%" : "-6%",
                    marginLeft: min ? "11%" : 0,
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: min ? "1.3em" : ".9em",
                  }}
                >
                  ¿QUÉ ES UNA BRESH?
                </p>
                <p
                  style={{
                    marginTop: min ? "-2.4%" : "0%",
                    marginLeft: min ? "10%" : 0,
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "2.1em",
                  }}
                >
                  ¿QUÉ RELACIÓN TIENE CON
                </p>
                <p
                  style={{
                    marginTop: min ? "-2.4%" : "-1%",
                    marginLeft: min ? "10%" : 0,
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "2.1em",
                  }}
                >
                  UNA MARQUESH?
                </p>
                <div>
                  <img
									src={liner}
									alt="imagenes"
                    style={{
                      width: mincel ? "80%" : "50%",
                      height: mincel ? "10" : "30%",
                      marginTop: mincel ? "-10%" : "1%",
						alignContent: "center",

                    }}
                  ></img>
                </div>
                <p
                  style={{
                    padding: mincel ? 5 : 10,
                    textAlign: "justify",
                    marginTop: "3%",
                    marginLeft: min ? "10%" : "1%",
                    marginRight: min ? "10%" : "1%",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: min ? "2em" : "1em",
                  }}
                >
                  Es una fiesta creada a partir de los conceptos de LIBERDAD,
                  AUTENTICIDAD Y PERTENENCIA. La libertad es la que marca el
                  ritmo. La autenticidad es lo que define el dress code. La
                  pertenencia es porque no tiene reglas. La Marquesh busca que
                  disfurtes la noche de una maera distinta, lejos de los
                  clásicos boliches, donde se acepta un el estilo único y
                  estructurado para todas las personas. La ambientación del
                  lugar, el glitter y VOS son los protagonistas de la fiesta. Y
                  lo más importante es que las invitados bailen y disfruten de
                  hitazos y de temas icónicos. ¿Cuál es nuestro objetivo? Que
                  disfrutes de una noche en la que podés ser vos mismo. Que sea
                  un espacio en donde la compañía, la ambientación y la buena
                  música estén en su máximo esplendor!
                </p>
              </Grid>
            </Grid>
            <Grid item sm={12} xs={12} md={6} style={{}}>
              <Grid
                container
                direction="column"
                justifyContent={"center"}
                alignItems={min ? "flex-start" : "center"}
              ></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Header state="agenda"></Header>
      </div>
    );
  }
}

Agenda.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Agenda;
