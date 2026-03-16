import React from "react";

import { Grid } from "@material-ui/core";
import Background from "../assets/fondo_web.jpg";

import logoVeteGrande from "../assets/Logo.png";

import logoNovo from "../assets/logo_marquez.png";

import Registrarse from "../assets/buttonRegister.png";
import { colors } from "../utils";
import "./Main.css";

import Loader from "react-loader-spinner";

import CryptoAES from "crypto-js/aes";

var date = new Date();

class Registersimple extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      name: "",
      lastname: "",
      email: "",
	  phone: "",
      error: null,
      loading: false,
      send: false,
      registroExitoso: false,
      fechaIngreso: date.toLocaleDateString("es-ES", "D/M/YYYY"),
      horaIngreso: date.toLocaleTimeString("es-ES", "h/m/ss"),
    };
  }

  pdf() {
    window.open(
      "https://eventoimagenes.s3.amazonaws.com/Aviso+de+tratamiento+de+datos_El+corazon+de+la+diabetes_compressed.pdf",
      "_blank"
    );
  }

  pdf2() {
    window.open(
      "https://eventoimagenes.s3.amazonaws.com/Te%CC%81rminos+de+uso_El+corazon+de+la+diabetes_compressed.pdf",
      "_blank"
    );
  }

  register() {
    const email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (email.test(this.state.email)) {
      // this is a valid email address
      // call setState({email: email}) to update the email
      // or update the data in redux store.
    } else {
      this.setState({
        error: "Email inválido",
      });
      return;
    }

    this.setState({ send: true });
    if (this.state.email === "") {
      return;
    }

    this.setState({
      error: null,
      loading: true,
    });

    //    var secretMessage = (this.state.first_name + this.state.last_name +  this.state.dni + this.state.email)
    //    var secretKey = 'Cruz2022'

    //    // var idhash = CryptoJS.AES.encrypt((i + localStorage.dni + this.state.fechaIngreso + tickettype), 'cruz').toString()
    //    var encryptedMessage = CryptoAES.encrypt(secretMessage, secretKey)
    //   // var idhash = encryptedMessage
    //    var idhash = encryptedMessage.toString(CryptoAES.Utf8)
    //    //console.log(idhash);
    //    //var _ciphertext = CryptoAES.decrypt(idhash.toString(), secretKey);
    //    //console.log(_ciphertext.toString(CryptoENC));

    const body = {
      email: this.state.email,
      dni: localStorage.dni,
      concept: this.state.concept,
      asist: this.state.asist,
      restriction: this.state.restriction,
	  idhash: localStorage.idhash,
      phone: this.state.phone,
      loginType: "10",
    };
    console.log(body);

    // eslint-disable-next-line
    var response = fetch(
      "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/updateUsersQR",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          this.setState({ error: response, loading: false });
        }
      })
      .then((response) => {
        console.log(response);
        if (response.message) {
          this.setState({
            error: "ALTA EXITOSA",
            registroExitoso: true,
            loading: false,
          });
        } else {
          this.setState({
            error: "Usuario Existente",
            registroExitoso: false,
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({ error: error + "Usuario Existente", loading: false });
      });
  }

  sendMail() {
    var secretMessage = this.state.dni;
    var secretKey = "lamarquesh2022";

    // var idhash = CryptoJS.AES.encrypt((i + localStorage.dni + this.state.fechaIngreso + tickettype), 'cruz').toString()
    var encryptedMessage = CryptoAES.encrypt(secretMessage, secretKey);
    // var idhash = encryptedMessage
    var idhash = encryptedMessage.toString(CryptoAES.Utf8);
    //console.log('ACAC QR',idhash);
    //var _ciphertext = CryptoAES.decrypt(idhash.toString(), secretKey);
    // console.log(_ciphertext.toString(CryptoENC));

    const body2 = {
      dni: this.state.dni,
      email: this.state.email,
      fechaIngreso: this.state.fechaIngreso,
      horaIngreso: this.state.horaIngreso,
      idhash: idhash,
    };
    // eslint-disable-next-line
    var response = fetch(
      "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/loginUsersQR",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body2),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          this.setState({ error: response, loading: false });
        }
      })
      .then((response) => {
        if (!response.error) {
          this.cleandatos();
          this.setState({ error: "ALTA EXITOSA", loading: false });
        } else {
          this.cleandatos();
          this.setState({ error: "Usuario Existente", loading: false });
        }
      })
      .catch((error) => {
        this.setState({ error: error + "Usuario Existente", loading: false });
      });
  }

  cleandatos() {
    document.getElementById("dni").value = " ";
    document.getElementById("first_name").value = " ";
    document.getElementById("last_name").value = " ";
    document.getElementById("email").value = " ";
  }

  goback() {
    document.location.href = "/Qrcodes";
  }

  render() {
    //const height = window.innerHeight;
    const min = window.innerWidth >= 1000;
    //const minxs = window.innerWidth <= 700;
    var disabledbutton = false;
    //const email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //const width = window.innerWidth < 1000;

    var header = (
      <Grid
        item
        xs={12}
        sm={12}
        l={3}
        md={3}
        lg={4}
        style={{ height: "100%", display: "flex" }}
      >
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            justifycontent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            height="auto"
            alt="image1"
            width="100%"
            style={{ marginLeft: 30, marginTop: 50, maxWidth: 500 }}
            src={logoVeteGrande}
          />
          <img
            alt="image1"
            width="100%"
            style={{
              width: 100,
              height: 40,
              position: "absolute",
              bottom: 10,
              left: 10,
            }}
            src={logoNovo}
          ></img>
        </div>
      </Grid>
    );

    const h = window.innerHeight;
    if (window.matchMedia("screen and (max-width: 768px)").matches) {
      header = (
        <Grid item xs={12} sm={12} md={4} l={4} lg={4}>
          <img
            alt="image1"
            height="auto"
            width="100%"
            style={{ marginTop: 50, maxWidth: 500 }}
            src={logoVeteGrande}
          />
          <div
            style={{
              display: "flex",
              justifycontent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          ></div>
        </Grid>
      );
    }
    //console.log(localStorage.first_name)
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            justifycontent: "center",
            backgroundImage: `url(${Background})`,
            minHeight: h,
            height: "100%",
            width: "100%",
            backgroundSize: "cover",
          }}
        >
          {this.state.loading && (
            <div>
              <Loader type="TailSpin" color="#B58E44" height={80} width={80} />
            </div>
          )}
          <Grid container direction="row" style={{ height: "100%" }}>
            {header}
            <Grid item xs={12} sm={9} md={9} l={9} lg={8} style={{}}>
              <Grid
                container
                direction="column"
                justifycontent="center"
                alignItems="center"
                style={{ height: "100%", marginTop: 1 }}
              >
                <p
                  onClick={this.goback}
                  style={{
                    marginTop: 10,
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "2em",
                    color: "white",
                    right: 0,
                    top: 0,
                    position: "absolute",
                  }}
                >
                  X
                </p>
                <p
                  className="titleFormTitle"
                  style={{
                    padding: 10,
                    marginTop: 20,
                    textAlign: min ? "right" : "center",
                  }}
                >
                  {" "}
                  REGISTRO
                </p>
                <Grid
                  item
                  style={{
                    background: "white",
                    width: "90%",
                    padding: 30,
                    borderRadius: 30,
                  }}
                >
                  <div style={{ marginTop: 0 }}>
                    <p className="titleFormTitle"> Registro</p>
                  </div>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    style={{ marginTop: 10 }}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      style={{
                        alignItems: "start",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <p className="textForm"> Nombre</p>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      style={{
                        height: 30,
                        borderRadius: 0,
                        borderColor: colors.gray,
                        borderWidth: 1,
                        borderStyle: "solid",
                      }}
                    >
                      {" "}
                      <p className="textForm">{localStorage.first_name}</p>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      style={{ marginTop: 10 }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={2}
                        style={{
                          alignItems: "start",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <p className="textForm"> Apellido</p>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        style={{
                          height: 30,
                          borderRadius: 0,
                          borderColor: colors.gray,
                          borderWidth: 1,
                          borderStyle: "solid",
                        }}
                      >
                        <p className="textForm">{localStorage.last_name}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    style={{ marginTop: 10 }}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      style={{
                        alignItems: "start",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <p className="textForm"> Email</p>
                      <p className="textFormError">
                        {this.state.email === "" && this.state.send
                          ? "Campo requerido"
                          : ""}
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      style={{
                        height: 30,
                        borderRadius: 8,
                        borderColor: colors.gray,
                        borderWidth: 1,
                        borderStyle: "solid",
                      }}
                    >
                      <input
                        style={{
                          height: 30,
                          borderRadius: 0,
                          borderColor: colors.gray,
                          borderWidth: 1,
                          borderStyle: "solid",
                          backgroundColor: "#CDCDCD",
                          width: "100%",
                          border: "none",
                        }}
                        type="email"
                        required
                        id="email"
                        placeholder={"ej.: ejemplo@gmail.com"}
                        className="no-outline"
                        onChange={(event) =>
                          this.setState({
                            send: false,
                            email: event.target.value,
                            error: null,
                          })
                        }
                      ></input>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    style={{ marginTop: 10 }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                      sm={2}
                      style={{
                        alignItems: "start",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <p className="textForm">ASISTE?</p>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      sm={10}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ marginRight: 20 }}>
                        <label style={{ marginRight: 10 }}>
                          Sí
                          <input
                            type="radio"
                            style={{ marginLeft: 20 }}
                            name="asist"
                            value="true"
                            onChange={(event) =>
                              this.setState({
                                send: false,
                                asist: event.target.value,
                                error: null,
                              })
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label style={{ marginRight: 10 }}>
                          No
                          <input
                            type="radio"
                            name="asist"
                            value="false"
                            style={{ marginLeft: 20 }}
                            onChange={(event) =>
                              this.setState({
                                send: false,
                                asist: event.target.value,
                                error: null,
                              })
                            }
                          />
                        </label>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    style={{ marginTop: 10 }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                      sm={2}
                      style={{
                        alignItems: "start",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <p className="textForm">RESTRICCIONES ALIMENTICIAS</p>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      sm={10}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "left",
                      }}
                    >
                      <div style={{ marginRight: 20 }}>
                        <label style={{ marginRight: 10 }}>
                          Sí
                          <input
                            type="radio"
                            style={{ marginLeft: 20 }}
                            name="restriction"
                            value="true"
                            onChange={(event) =>
                              this.setState({
                                send: false,
                                restriction: event.target.value,
                                error: null,
                              })
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label style={{ marginRight: 10 }}>
                          No
                          <input
                            type="radio"
                            name="restriction"
                            value="false"
                            style={{ marginLeft: 20 }}
                            onChange={(event) =>
                              this.setState({
                                send: false,
                                restriction: event.target.value,
                                error: null,
                              })
                            }
                          />
                        </label>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    style={{ marginTop: 10 }}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      style={{
                        alignItems: "start",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <p className="textForm">Cuál?</p>
                      <p className="textFormError">
                        {this.state.concept === "" && this.state.restriction
                          ? "Campo requerido"
                          : ""}
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      style={{
                        height: 30,
                        borderRadius: 8,
                        borderColor: colors.gray,
                        borderWidth: 1,
                        borderStyle: "solid",
                      }}
                    >
                      <input
                        style={{
                          height: 30,
                          borderRadius: 0,
                          borderColor: colors.gray,
                          borderWidth: 1,
                          borderStyle: "solid",
                          backgroundColor: "#CDCDCD",
                          width: "100%",
                          border: "none",
                        }}
                        type="text"
                        required
                        id="concept"
                        className="no-outline"
                        onChange={(event) =>
                          this.setState({
                            send: false,
                            concept: event.target.value,
                            error: null,
                          })
                        }
                      ></input>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    style={{ marginTop: 20, alignItems: "start" }}
                  >
                    {this.state.error && (
                      <div
                        style={{
                          width: "85%",
                          display: "flex",
                          justifycontent: "center",
                        }}
                      >
                        <p
                          style={{
                            borderRadius: 2,
                            background: "red",
                            margin: 10,
                            marginTop: 40,
                            color: "white",
                            fontFamily: "Roboto-SemiBold",
                          }}
                        >
                          {this.state.error}
                        </p>
                      </div>
                    )}

                    <Grid
                      item
                      xs={9}
                      sm={11}
                      style={{ display: "flex", alignItems: "center" }}
                    ></Grid>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifycontent: "flex-end",
                        marginTop: 10,
                      }}
                    >
                      <button
                        onClick={() => this.register()}
                        disabled={disabledbutton}
                        type="submit"
                        style={{
                          padding: 0,
                          cursor: "pointer",
                          border: "none",
                          background: "transparent",
                        }}
                      >
                        <img
                          width="180px"
                          alt="image1"
                          height="auto"
                          src={Registrarse}
                        ></img>
                      </button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        {this.state.registroExitoso && (
          <div className="popup-container">
            <div className="popup-content">
              <h1 className="big-text">Registro Exitoso</h1>
              <button
                onClick={() => {
                  // Redirigir a la página de inicio al hacer clic en el botón dentro del popup
                  document.location.href = "/HomeView";
                }}
              >
                Ir a Home
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Registersimple;
