import PropTypes from "prop-types";
import React from "react";

import { Button, Grid } from "@material-ui/core";

import { colors } from "../utils";

import { w3cwebsocket as W3CWebSocket } from "websocket";

class SendQuestions extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      error: null,
      question:
        "1. Semaglutida es de administración diaria y titulación semanall",
      response:
        "1. Semaglutida es de administración diaria y titulación semanal",
    };
  }

  componentDidMount() {
    this.setState({ height: window.innerHeight });
  }

  sendResponse2() {
    var clientv = new W3CWebSocket(
      "wss://n7bj7eh9le.execute-api.sa-east-1.amazonaws.com/production"
    );
    clientv.onopen = () => {
      //console.log('WebSocket Client Connected');
      var str = "response|" + this.state.response + "|1";
      clientv.send(str);
    };
  }

  sendQuestion() {
    this.setState({ error: null });
    const body = {
      question: this.state.question,
    };
    // eslint-disable-next-line
    var response = fetch(
      "https://4swa57ilx6.execute-api.sa-east-1.amazonaws.com/prod/send_question",
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
          this.setState({ error: response });
        }
      })
      .then((response) => {
        //ENVIAMOS PREGUNTA
        /*
                try {
                    var clientv = new W3CWebSocket('wss://n7bj7eh9le.execute-api.sa-east-1.amazonaws.com/production');
                    clientv.onopen = () => {
                        console.log('WebSocket Client Connected');
                        var str = "question|" + this.state.question
                        clientv.send(str);
                        console.log("send")
                    };
                } catch (e) {
                    alert(e);
                }
               */
      })
      .catch((error) => {
        alert(error);
        this.setState({ error: error });
      });
  }

  sendResponse() {
    this.setState({ error: null });
    const body = {
      question: this.state.response,
    };
    // eslint-disable-next-line
    var response = fetch(
      "https://4swa57ilx6.execute-api.sa-east-1.amazonaws.com/prod/send_response",
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
          this.setState({ error: response });
        }
      })
      .then((response) => {
        //ENVIAMOS PREGUNTA
        /*
                try {
                    var clientv = new W3CWebSocket('wss://n7bj7eh9le.execute-api.sa-east-1.amazonaws.com/production');
                    clientv.onopen = () => {
                        console.log('WebSocket Client Connected');
                        var str = "question|" + this.state.question
                        clientv.send(str);
                        console.log("send")
                    };
                } catch (e) {
                    alert(e);
                }
               */
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  clean() {
    this.setState({ error: null });
    const body = {
      question: " ",
    };
    // eslint-disable-next-line
    var response = fetch(
      "https://4swa57ilx6.execute-api.sa-east-1.amazonaws.com/prod/send_response",
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
          this.setState({ error: response });
        }
      })
      .then((response) => {
        //ENVIAMOS PREGUNTA
        /*
                try {
                    var clientv = new W3CWebSocket('wss://n7bj7eh9le.execute-api.sa-east-1.amazonaws.com/production');
                    clientv.onopen = () => {
                        console.log('WebSocket Client Connected');
                        var str = "question|" + this.state.question
                        clientv.send(str);
                        console.log("send")
                    };
                } catch (e) {
                    alert(e);
                }
               */
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  typeClick() {
    const email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (email.test(this.state.email)) {
      // eslint-disable-next-line
      const body = {
        email: this.state.email,
        password: this.state.pass,
      };
    } else {
      document.location.href = "/Home";
    }
  }
  render() {
    // eslint-disable-next-line
    const min = window.innerWidth >= 1000;
    // eslint-disable-next-line
    const height = window.innerHeight;
    // eslint-disable-next-line
    const email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    // eslint-disable-next-line
    var disabledbutton = false;
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      email.test(this.state.email) === false
    ) {
      // eslint-disable-next-line
      disabledbutton = true;
    }
    return (
      <div>
        <div style={{ display: "flex", height: this.state.height }}>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Grid
              item
              xs={11}
              sm={11}
              style={{
                width: "90%",
                height: "90%",
                backgroundColor: "white",
                boxShadow: " 0 3px 6px 0 #000000",
                padding: "2%",
                marginTop: "2%",
                marginBottom: "2%",
                position: "relative",
              }}
            >
              <Grid
                container
                alignItems="space-around"
                direction="row"
                justifyContent="center"
                style={{ width: "100%" }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{
                    marginTop: 50,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "black",
                    borderRadius: 20,
                    paddingTop: 40,
                    paddingBottom: 40,
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Grid
                      item
                      sm={4}
                      xs={4}
                      style={{
                        width: "35%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Montserrat-SemiBold",
                          fontSize: 18,
                          color: "white",
                          margin: 0,
                          lineHeight: 1.2,
                        }}
                      >
                        Enviar pregunta :{" "}
                      </p>
                    </Grid>
                    <Grid
                      item
                      sm={10}
                      xs={10}
                      style={{
                        width: "65%",
                        marginLeft: "5%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <select
                        className="no-outline"
                        type="email"
                        placeholder={"ej.: ejemplo@gmail.com"}
                        style={{
                          marginLeft: 5,
                          paddingTop: 5,
                          paddingBottom: 5,
                          width: "100%",
                          height: "100%",
                          borderStyle: "none",
                          borderRadius: 5,
                        }}
                        onChange={(event) =>
                          this.setState({ question: event.target.value })
                        }
                      >
                        <option selected id="1">
                          1. Semaglutida es de administración diaria y
                          titulación semanal
                        </option>
                        <option id="2">
                          2. Semaglutida siempre se debe iniciar con la dosis de
                          0,25mg/semana
                        </option>
                        <option id="3">
                          3. La dosis de mantenimiento de semaglutida es
                          1mg/semana
                        </option>
                        <option id="4">
                          4. El evento adverso más frecuente con semaglutida es
                          la pancreatitis{" "}
                        </option>
                        <option id="5">
                          5. El tratamiento con semaglutida produce más
                          intolerancia digestiva que otros arGLP1
                        </option>
                        <option id="6">
                          6. Durante el tratamiento no se puede modificar el día
                          de aplicación de semaglutida.
                        </option>
                        <option id="7">
                          7. Al iniciar con semaglutida debe ajustar la dosis de
                          metformina.
                        </option>
                        <option id="8">
                          8.Una paciente embarazada o en periodo de lactancia no
                          debe usar semaglutida
                        </option>
                        <option id="8">
                          9. El tratamiento con semalutida no es seguro en
                          adultos mayores
                        </option>
                        <option id="10">
                          10. Semaglutida puede indicarse en pacientes con
                          insuficiencia renal leve, moderada y severa.
                        </option>
                      </select>
                    </Grid>
                  </div>
                  <Grid item xs={12} sm={9} style={{ marginTop: 10 }}>
                    <Button
                      onClick={() => this.sendQuestion()}
                      style={{
                        paddingLeft: 30,
                        paddingRight: 30,
                        paddingTop: 10,
                        paddingBottom: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 30,
                        background: colors.gray,
                        borderRadius: 20,
                        marginLeft: "auto",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Montserrat-Black",
                          fontSize: 16,
                          color: "white",
                          margin: 0,
                        }}
                      >
                        ENVIAR
                      </p>
                    </Button>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{
                    marginTop: 50,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "black",
                    borderRadius: 20,
                    paddingTop: 40,
                    paddingBottom: 40,
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Grid
                      item
                      sm={4}
                      xs={4}
                      style={{
                        width: "35%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Montserrat-SemiBold",
                          fontSize: 18,
                          color: "white",
                          margin: 0,
                          lineHeight: 1.2,
                        }}
                      >
                        Enviar respuesta :{" "}
                      </p>
                    </Grid>
                    <Grid
                      item
                      sm={10}
                      xs={10}
                      style={{
                        width: "65%",
                        marginLeft: "5%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <select
                        className="no-outline"
                        type="email"
                        placeholder={"ej.: ejemplo@gmail.com"}
                        style={{
                          marginLeft: 5,
                          paddingTop: 5,
                          paddingBottom: 5,
                          width: "100%",
                          height: "100%",
                          borderStyle: "none",
                          borderRadius: 5,
                        }}
                        onChange={(event) =>
                          this.setState({ response: event.target.value })
                        }
                      >
                        <option selected id="1">
                          1. Semaglutida es de administración diaria y
                          titulación semanal
                        </option>
                        <option id="2">
                          2. Semaglutida siempre se debe iniciar con la dosis de
                          0,25mg/semana
                        </option>
                        <option id="3">
                          3. La dosis de mantenimiento de semaglutida es
                          1mg/semana
                        </option>
                        <option id="4">
                          4. El evento adverso más frecuente con semaglutida es
                          la pancreatitis{" "}
                        </option>
                        <option id="5">
                          5. El tratamiento con semaglutida produce más
                          intolerancia digestiva que otros arGLP1
                        </option>
                        <option id="6">
                          6. Durante el tratamiento no se puede modificar el día
                          de aplicación de semaglutida.
                        </option>
                        <option id="7">
                          7. Al iniciar con semaglutida debe ajustar la dosis de
                          metformina.
                        </option>
                        <option id="8">
                          8.Una paciente embarazada o en periodo de lactancia no
                          debe usar semaglutida
                        </option>
                        <option id="8">
                          9. El tratamiento con semalutida no es seguro en
                          adultos mayores
                        </option>
                        <option id="10">
                          10. Semaglutida puede indicarse en pacientes con
                          insuficiencia renal leve, moderada y severa.
                        </option>
                      </select>
                    </Grid>
                  </div>
                  <Grid item xs={12} sm={9} style={{ marginTop: 10 }}>
                    <Button
                      onClick={() => this.sendResponse()}
                      style={{
                        paddingLeft: 30,
                        paddingRight: 30,
                        paddingTop: 10,
                        paddingBottom: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 30,
                        background: colors.gray,
                        borderRadius: 20,
                        marginLeft: "auto",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Montserrat-Black",
                          fontSize: 16,
                          color: "white",
                          margin: 0,
                        }}
                      >
                        ENVIAR
                      </p>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button
              onClick={() => this.clean()}
              style={{
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 10,
                paddingBottom: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
                background: colors.gray,
                borderRadius: 20,
                marginLeft: "auto",
              }}
            >
              <p
                style={{
                  fontFamily: "Montserrat-Black",
                  fontSize: 16,
                  color: "white",
                  margin: 0,
                }}
              >
                CLEAN
              </p>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

SendQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SendQuestions;
