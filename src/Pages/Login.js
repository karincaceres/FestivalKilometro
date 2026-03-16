import React from 'react';

import {Box, Button, Grid} from '@material-ui/core';
//import Background from '../assets/Fondos/FONDO.jpg'
import {colors} from '../utils';
//import BackgroundR from '../assets/Fondos/FondosSmall/fondo1_375x667.jpg'
import Aceptar from '../assets/Botones/aceptar.png';
import Ingresar from '../assets/Botones/ingresar-01.png';
import Registrarse from '../assets/Botones/registrarse.png';
import LogoTop from '../assets/Logo.png';

import CryptoAES from 'crypto-js/aes';
import Loader from 'react-loader-spinner';
import {default as Background, default as BackgroundR} from '../assets/Fondos/fondo1.png';
import savethedate from '../assets/Logos/fecha-logo-inicio.png';
import logo2 from '../assets/Logos/logo-marquez-menu.png';

import '../Pages/Main.css';
var date = new Date();
// eslint-disable-next-line
var email = '';
// eslint-disable-next-line
var loginIngreso = true;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      dni: '', // Added state for dni
      email: '',
      email2: '',
      isRegister: false,
      emailError: '',
      pass: '',
      phone: '',
      concept: '',
      asist: true,
      restriction: false,
      send: false,
      registroExitoso: false,
      loading: false,
      primerlogin: '',
      showPopup: false,
      isVisible: false,
      fechaIngreso: date.toLocaleDateString('es-ES', 'D/M/YYYY'),
      horaIngreso: date.toLocaleTimeString('es-ES', 'h/m/ss'),
    };

      const eventDate = new Date("2025-12-07T19:00:00");
      const finevento = new Date("2025-12-07T23:59:00");

    localStorage.setItem('eventDate', eventDate);
    localStorage.setItem('finevento', finevento);
  }

  componentDidMount() {
    this.setState({height: window.innerHeight});
  }

  salir() {
    localStorage.clear();

    document.location.href = '/Login';
  }

  validateEmail(email1, email2) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email1 !== '' && email2 !== '') {
      if (emailRegex.test(email1) & emailRegex.test(email2)) {
        if (!(email1 === email2)) {
          this.setState({
            error: 'No coinciden los Email',
          });
          return;
        } else {
          this.login();
          return;
        }
        // this is a valid email address
        // call setState({email: email}) to update the email
        // or update the data in redux store.
      } else {
        this.setState({
          error: 'Email inválido',
        });
        return;
      }
    } else {
      this.setState({
        error: 'Debe completar ambos mail',
      });
      return;
    }
  }

  login() {
    var secretMessage = this.state.dni;
    var secretKey = 'lamarquesh2022';
    var encryptedMessage = CryptoAES.encrypt(secretMessage, secretKey);
    var idhash = encryptedMessage.toString(CryptoAES.Utf8);

    this.setState({error: null});

    if (this.state.dni === '') {
      this.setState({
        error: 'Debe introducir un DNI válido',
        loading: false,
      });
      return;
    }

    // Aquí validamos si es el primer inicio de sesión y, en ese caso, validamos los correos electrónicos.

    const body = {
      dni: this.state.dni,
      email: this.state.email,
      idhash: idhash,
    };
    //console.log('body',body)
    this.setState({loading: true});
    // eslint-disable-next-line
    var response = fetch('https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/loginUsersQR', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          this.setState({
            error: 'error envio de mail',
            loading: false,
          });
          return;
        }
      })
      .then(response => {
        if (!response.error) {
          localStorage.setItem('dni', this.state.dni);
          localStorage.setItem('first_name', response.first_name);
          localStorage.setItem('last_name', response.last_name);
          localStorage.setItem('loginType', response.loginType);
          localStorage.setItem('idhash', response.idhash);
          localStorage.setItem('email', response.email);
          localStorage.setItem('primerlogin', response.primerlogin);
          this.setState({loading: false});
          if (response.email === '') {
            //document.location.href = "/Registersimple";
            this.setState({
              showPopup: true,
              isRegister: true,
            });
            return;
          }

          if (localStorage.loginType === '10') {
            if (response.primerlogin === '1') {
              this.setState({
                isVisible: true,
                showPopup: true,
                primerlogin: '1',
              });

              // document.location.href = '/ProntoWeb'
            } else {
              //  document.location.href = '/Cargando'

              document.location.href = '/HomeView';
            }
          } else if (localStorage.loginType === '2') {
            document.location.href = '/Qrcodes';
          } else if (response.loginType === '9') {
            document.location.href = '/CargaPuntos';
          } else if (localStorage.loginType === '5' || localStorage.loginType === '7') {
            document.location.href = '/Register';
          } else if (localStorage.loginType === '1') {
            document.location.href = '/Metricas';
          }
        } else {
          this.clean();
          this.setState({
            error: 'El usuario no ha sido previamente cargado. Te pedimos por favor que envíes un mail a mariela.bole@advantaseeds.com',
            loading: false,
          });
          document.getElementById('dni').value = '';
        }
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false,
        });
      });
  }
  register() {
    const email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const email2 = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (email.test(this.state.email) | email2.test(this.state.email2)) {
      if (this.state.email !== this.state.email2) {
        this.setState({
          error: 'Email No Coinciden',
        });
        return;
      }
      // this is a valid email address
      // call setState({email: email}) to update the email
      // or update the data in redux store.
    } else {
      this.setState({
        error: 'Email inválido',
      });
      return;
    }

    this.setState({send: true});
    if (this.state.email === '') {
      return;
    }
    if (this.state.phone === '') {
      this.setState({
        error: 'Debe introducir un nº de celular válido',
        loading: false,
      });
      return;
    }

    this.setState({
      error: null,
      loading: true,
      isRegister: false,
    });

    const body = {
      email: this.state.email,
      dni: localStorage.dni,
      concept: this.state.concept,
      asist: this.state.asist,
      restriction: this.state.restriction,
      idhash: localStorage.idhash,
      phone: this.state.phone,
      loginType: '10',
    };
    localStorage.setItem('email', this.state.email);
    // console.log(body);

    // eslint-disable-next-line
    var response = fetch('https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/updateUsersQR', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          this.setState({error: response, loading: false});
        }
      })
      .then(response => {
        if (response.message) {
          this.login();
          //  this.setState({ error: "ALTA EXITOSA",registroExitoso: true, loading: false });
        } else {
          this.setState({
            error: response.error,
            registroExitoso: false,
            isRegister: false,
            loading: false,
          });
        }
      })
      .catch(error => {
        this.setState({error: error + 'Usuario Existente', loading: false});
      });
  }

  clean() {
    //document.getElementById("dni").value = "";
    this.setState({error2: null});
  }
  goHome() {
    document.location.href = '/HomeView';
  }

  render() {
    const max = window.innerWidth >= 1400;
    const mincel = window.innerWidth <= 500;
    const mid = window.innerWidth > 1000 && window.innerWidth < 1400;

    // eslint-disable-next-line
    const email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    // eslint-disable-next-line
    var disabledbutton = false;
    if (this.state.dni === '' || this.state.password === '') {
      disabledbutton = true;
    }

    // Estilo para la caja de ingreso de DNI
    const dniBoxStyle = {
      position: 'absolute',
      top: '60%',
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      left: mincel ? '0' : '50%',
      transform: mincel ? 'translate(0, -50%)' : 'translate(-50%, -35%)',
      zIndex: 100,
      maxWidth: max ? '60%' : mid ? '60%' : '100%',
      backgroundColor: 'rgba(0, 0, 50, 0.4)', // Color azul marino con opacidad
      padding: 10,
      borderRadius: 3,
    };

    const loadingOverlayStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)', // Fondo semi-transparente
      zIndex: 999, // Asegura que esté por encima del contenido principal
    };

    const logoContainerStyle = {
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      zIndex: 999, // Asegura que esté por encima del contenido principal
    };
    const min = window.innerWidth >= 790;
    let backImg = Background;
    if (min) {
      backImg = Background;
    } else {
      backImg = BackgroundR;
    }
    return (
      <div>
        <div
          style={{
            zindex: 20,
            width: '100vw',
            backgroundImage: `url(${backImg})`,
            backgroundSize: 'cover',
            height: '100vh',
            overflow: 'auto',
          }}>
          <Grid container flexdirection="column" justifyContent="center">
            <Grid item xs={12} sm={12} md={12} l={12}>
              {!this.state.isRegister && (
                <div style={logoContainerStyle}>
                  <img
                    alt="imagen1"
                    style={{
                      width: mincel ? '70vw' : max ? '30vw' : '28vw',
                      height: 'auto',
                      marginTop: 20,
                    }}
                    src={LogoTop}></img>
                </div>
              )}
              <div
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  margin: 'auto',
                  alignContent: 'center',
                }}>
                {!this.state.showPopup ? (
                  <>
                    <Box sx={dniBoxStyle}>
                      <div style={{marginTop: max ? '1%' : mid ? '1%' : mincel ? '5%' : '1%', width: '100%', display: 'flex', flexDirection: 'column', padding: mincel ? 0 : 20}}>
                        <p className="textLogin" style={{textAlign: 'center', fontSize: mid ? '0.9em' : max ? '1.3em' : '1em', color: 'white', marginTop: '1%'}}>
                          Ingresá tu DNI (sin puntos) para iniciar sesión y vivir el lanzamiento de campaña 2024
                        </p>
                        <Grid item sm={12} xs={12} md={12} l={12} style={{marginTop: '2%', width: '100%', height: '100%'}}>
                          <input className="no-outline" type="number" required id="dni" placeholder="xxxxxxxx" style={{fontSize: mid ? '1em' : mincel ? '0.9em' : '1.2em', paddingTop: 5, paddingBottom: 5, width: '100%', borderStyle: 'none', borderRadius: 5, height: 45}} onChange={event => this.setState({dni: event.target.value, error: null})}></input>
                        </Grid>
                        <div style={{width: '100%', display: 'flex', justifyContent: mincel ? 'center' : 'center'}}>
                          <Button onClick={() => this.login()} type="submit" style={{cursor: 'pointer', border: 'none', background: 'transparent'}}>
                            <img alt="imagen1" width="70%" height="auto" src={Ingresar}></img>
                          </Button>
                        </div>
                      </div>
                    </Box>
                  </>
                ) : (
                  <>
                    {!this.state.isVisible ? (
                      <>
                        <div style={{bottom: 0, backgroundSize: 'cover', width: mincel ? '100vw' : '70vw', height: '100%', position: mincel ? '' : 'absolute', flex: 1, top: mincel ? 0 : '50%', left: mincel ? '0' : '50%', transform: mincel ? '' : 'translate(-50%, -50%)', flexDirection: 'column', zIndex: 990, maxWidth: '100vw', backgroundColor: 'rgba(0, 0, 50, 0.8)', padding: 1, borderRadius: 3}}>
                          <Grid item style={{marginBottom: mincel ? '60px' : 0, paddingLeft: '5%', paddingRight: '5%'}}>
                            <div style={{marginTop: '20px', fontSize: '3em'}}>
                              <div style={{}}>
                                <img alt="imagen1" src={LogoTop} style={{width: mincel ? '60vw' : '15vw'}} />
                              </div>
                              <p style={{color: 'white', fontSize: mincel ? '1.1em' : '0.8em', fontFamily: 'Bebas Neue'}}>REGISTRATE</p>
                            </div>

                            <Grid container direction="row" alignItems="center" style={{marginTop: '-20px'}}>
                              <Grid item xs={12} sm={6} style={{padding: 5, alignItems: 'start', display: 'flex', flexDirection: 'column'}}>
                                <p className="textTerm"> NOMBRE</p>
                                <p className="textForm" style={{textAlign: 'left', height: 30, borderRadius: 0, borderColor: colors.gray, borderWidth: 1, borderStyle: 'solid', backgroundColor: '#fff', width: '100%', border: 'none', opacity: '70%'}}>
                                  {localStorage.first_name}
                                </p>
                              </Grid>
                              <Grid item xs={12} sm={6} style={{padding: 5, alignItems: 'start', display: 'flex', flexDirection: 'column'}}>
                                <p className="textTerm"> APELLIDO</p>
                                <p className="textForm" style={{textAlign: 'left', height: 30, borderRadius: 0, borderColor: colors.gray, borderWidth: 1, borderStyle: 'solid', backgroundColor: '#fff', width: '100%', border: 'none', opacity: '70%'}}>
                                  {localStorage.last_name}
                                </p>
                              </Grid>
                            </Grid>
                            <Grid container direction="row" alignItems="center" style={{marginTop: 5}}>
                              <Grid item xs={12} sm={6} style={{padding: 5, alignItems: 'start', display: 'flex', flexDirection: 'column'}}>
                                <p className="textTerm"> DNI</p>
                                <p className="textForm" style={{textAlign: 'left', height: 30, borderRadius: 0, borderColor: colors.gray, borderWidth: 1, borderStyle: 'solid', backgroundColor: '#fff', width: '100%', border: 'none', opacity: '70%'}}>
                                  {localStorage.dni}
                                </p>
                              </Grid>
                              <Grid item xs={12} sm={6} style={{padding: 5, alignItems: 'start', display: 'flex', flexDirection: 'column'}}>
                                <p className="textTerm"> CELULAR CON CODIGO DE ÁREA</p>
                                <p className="textFormError">{this.state.phone === '' && this.state.send ? 'Campo requerido' : ''}</p>
                                <input style={{height: 30, borderRadius: 0, borderColor: colors.gray, borderWidth: 1, borderStyle: 'solid', backgroundColor: '#fff', width: '100%', border: 'none'}} type="number" required id="phone" placeholder={'ej.: 011xxxxxxx'} className="no-outline" onChange={event => this.setState({send: false, phone: event.target.value, error: null})}></input>
                              </Grid>
                            </Grid>
                            <Grid container direction="row" alignItems="center" style={{marginTop: 5}}>
                              <Grid item xs={12} sm={6} style={{padding: 5, alignItems: 'start', display: 'flex', flexDirection: 'column'}}>
                                <p className="textTerm"> MAIL</p>
                                <p className="textFormError">{this.state.email === '' && this.state.send ? 'Campo requerido' : ''}</p>
                                <input style={{height: 30, borderRadius: 0, borderColor: colors.gray, borderWidth: 1, borderStyle: 'solid', backgroundColor: '#fff', width: '100%', border: 'none'}} type="email" required id="email" placeholder={'ej.: ejemplo@gmail.com'} className="no-outline" onChange={event => this.setState({send: false, email: event.target.value, error: null})}></input>
                              </Grid>
                              <Grid item xs={12} sm={6} style={{padding: 5, alignItems: 'start', display: 'flex', flexDirection: 'column'}}>
                                <p className="textTerm"> CONFIRMACIÓN DE MAIL</p>
                                <p className="textFormError">{this.state.email2 === '' && this.state.send ? 'Campo requerido' : ''}</p>
                                <input style={{height: 30, borderRadius: 0, borderColor: colors.gray, borderWidth: 1, borderStyle: 'solid', backgroundColor: '#fff', width: '100%', border: 'none'}} type="email" required id="email2" placeholder={'ej.: ejemplo@gmail.com'} className="no-outline" onChange={event => this.setState({send: false, email2: event.target.value, error: null})}></input>
                              </Grid>
                            </Grid>

                            <Grid container direction="row" alignItems="center" style={{marginTop: 5}}>
                              <Grid item xs={6} md={3} sm={3} style={{padding: 5, alignItems: 'start', display: 'flex', flexDirection: 'column'}}>
                                <p className="textTerm">ASISTE AL EVENTO</p>
                              </Grid>
                              <Grid item xs={6} md={3} sm={3} style={{color: 'white', display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                                <div style={{marginRight: 2}}>
                                  <label style={{marginRight: 10}}>
                                    Sí
                                    <input type="radio" style={{marginLeft: 20}} name="asist" value="true" onChange={event => this.setState({send: false, asist: event.target.value, error: null})} />
                                  </label>
                                </div>
                                <div>
                                  <label style={{marginRight: 10}}>
                                    No
                                    <input type="radio" name="asist" value="false" style={{marginLeft: 20}} onChange={event => this.setState({send: false, asist: event.target.value, error: null})} />
                                  </label>
                                </div>
                              </Grid>
                              {this.state.asist === 'true' && (
                                <>
                                  <Grid item xs={6} md={3} sm={3} style={{padding: 5, alignItems: 'start', display: 'flex', flexDirection: 'column'}}>
                                    <p className="textTerm" style={{textAlign: 'left'}}>
                                      RESTRICCIONES ALIMENTICIAS
                                    </p>
                                  </Grid>
                                  <Grid item xs={6} md={3} sm={3} style={{color: 'white', display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                                    <div style={{marginRight: 2}}>
                                      <label style={{marginRight: 10}}>
                                        Sí
                                        <input type="radio" style={{marginLeft: 20}} name="restriction" value="true" onChange={event => this.setState({send: false, restriction: event.target.value, error: null})} />
                                      </label>
                                    </div>
                                    <div>
                                      <label style={{marginRight: 10}}>
                                        No
                                        <input type="radio" name="restriction" value="false" style={{marginLeft: 20}} onChange={event => this.setState({send: false, restriction: event.target.value, error: null})} />
                                      </label>
                                    </div>
                                  </Grid>
                                </>
                              )}
                            </Grid>
                            {this.state.restriction === 'true' && (
                              <>
                                <Grid container direction="row" alignItems="center" style={{marginTop: 5}}>
                                  <Grid item xs={12} sm={3} style={{padding: 5, alignItems: 'start', display: 'flex', flexDirection: 'column'}}>
                                    <p className="textTerm">QUÉ RESTRICCIÓN</p>
                                    <p className="textFormError">{this.state.concept === '' && this.state.restriction ? 'Campo requerido' : ''}</p>
                                  </Grid>

                                  <Grid item xs={12} sm={9} style={{}}>
                                    <input style={{height: 30, borderWidth: 1, borderStyle: 'solid', backgroundColor: '#fff', width: '80%', border: 'none'}} type="text" required id="concept" className="no-outline" onChange={event => this.setState({send: false, concept: event.target.value, error: null})}></input>
                                  </Grid>
                                </Grid>
                              </>
                            )}

                            <Grid item xs={12} sm={12} style={{marginTop: '35px', alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
                              <div style={{textAlign: 'center'}}>
                                <button onClick={() => this.register()} disabled={disabledbutton} type="submit" style={{padding: 0, cursor: 'pointer', border: 'none', background: 'transparent'}}>
                                  <img width="180px" alt="image1" height="auto" src={Registrarse}></img>
                                </button>
                              </div>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12} style={{alignItems: 'center', display: 'flex', flexDirection: 'column', position: mincel ? '' : 'fixed', bottom: 10, width: '100%'}}>
                              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                <img alt="imagen" style={{maxWidth: min ? '10vw' : '20vw', marginTop: 30, marginRight: 40}} src={logo2} />
                                <img alt="imagen" style={{maxWidth: min ? '12vw' : '40vw', marginTop: 40}} src={savethedate} />
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{width: mincel ? '100vw' : '60vw', position: 'absolute', flex: 1, top: mincel ? '60%' : '50%', left: '50%', transform: 'translate(-50%, -50%)', flexDirection: 'row', zIndex: 990, maxWidth: mincel ? '100vw' : '90vw', background: 'linear-gradient(to bottom right, #102D69, #13A538)', padding: 10, borderRadius: 10}}>
                          <p style={{textAlign: 'center', color: 'white', fontSize: mincel ? '1.6em' : '2em', fontFamily: 'Bebas Neue'}} height="auto">
                            YA SOS PARTE DE ESTE GRAN EVENTO
                          </p>
                          <div className="Montserrat-Light" style={{color: 'white', fontSize: mid ? '0.9em' : mincel ? '1em' : '1em', width: '100%', display: 'flex', textAlign: 'left', marginTop: '1%'}}>
                            <span>
                              {' '}
                              Ingresá al mail que acabas de registrar y revisá la bandeja de entrada. Allí recibirás un correo del remitente: <p style={{textAlign: 'center', fontWeight: 'bold'}}> hambredegloria.advanta@gmail.com </p> <p> Si no te llegó, no te olvides de fijarte en Spam. Ese E-TICKET es tu entrada para ingresar al EVENTO. En caso de no recibirlo, podrás descargarlo de esta página. </p>{' '}
                            </span>
                          </div>
                          <div style={{fontSize: 14, width: '100%', display: 'flex', justifyContent: 'center', marginTop: '-1%'}}>
                            <Button onClick={() => this.goHome()} style={{cursor: 'pointer'}}>
                              <img alt="imagen1" width="130px" height="auto" src={Aceptar}></img>
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              {this.state.loading && (
                <div style={loadingOverlayStyle}>
                  <Loader type="TailSpin" color="#13A538" height={80} width={80} />
                </div>
              )}
              {this.state.error && (
                <div style={{width: mincel ? '80%' : '50%', display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#EA580C', color: '#000000', padding: '20px', borderRadius: '10px', textAlign: 'center', zIndex: 999}}>
                  <div style={{position: 'absolute', top: '-15px', right: '-15px', cursor: 'pointer', backgroundColor: '#FFFFFF', fontSize: '24px', width: '36px', height: '36px', borderRadius: '50%', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => this.setState({error: false})}>
                    X
                  </div>
                  <p style={{fontSize: mincel ? '1em' : '1.5em', borderRadius: 2, margin: 10, marginTop: 20, color: 'white', fontFamily: 'Montserrat-SemiBold'}}>{this.state.error}</p>
                </div>
              )}
            </Grid>
          </Grid>
          {!this.state.isRegister && (
            <Grid item xs={12} md={12} sm={12} style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', position: 'absolute', bottom: 20}}>
                <img alt="imagen" style={{maxWidth: min ? '10vw' : '20vw', marginTop: 30, marginRight: 40}} src={logo2} />
                <img alt="imagen" style={{maxWidth: min ? '12vw' : '40vw', marginTop: 40}} src={savethedate} />
              </div>
            </Grid>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
