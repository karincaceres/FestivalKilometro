import React from 'react';

import {Grid} from '@material-ui/core';
import Background from '../assets/Fondos/fondo1.png';

import logoVeteGrande from '../assets/Logo.png';

import logoNovo from '../assets/Logos/logo-marquez-menu.png';

import Registrarse from '../assets/Botones/aceptar.png';
import {colors} from '../utils';
import './Main.css';

import CryptoAES from 'crypto-js/aes';

var date = new Date();

class Register extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      error: '',
      loading: false,
      send: false,
      dni: '',
      fechaIngreso: date.toLocaleDateString('es-ES', 'D/M/YYYY'),
      horaIngreso: date.toLocaleTimeString('es-ES', 'h/m/ss'),
    };
  }

  pdf() {
    window.open('https://eventoimagenes.s3.amazonaws.com/Aviso+de+tratamiento+de+datos_El+corazon+de+la+diabetes_compressed.pdf', '_blank');
  }

  pdf2() {
    window.open('https://eventoimagenes.s3.amazonaws.com/Te%CC%81rminos+de+uso_El+corazon+de+la+diabetes_compressed.pdf', '_blank');
  }

  register() {
    var idhash = '';
    // Si localStorage es igual a 5, no se realiza la validación del correo electrónico
    if (localStorage.getItem('loginType') === '7') {
      // eslint-disable-next-line
      const email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      // Realizar la validación del correo electrónico
      const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (!emailRegex.test(this.state.email) && this.state.email !== '') {
        this.setState({
          error: 'Email inválido',
        });
        return;
      }
      var secretMessage = this.state.dni;
      var secretKey = 'lamarquesh2022';

      // var idhash = CryptoJS.AES.encrypt((i + localStorage.dni + this.state.fechaIngreso + tickettype), 'cruz').toString()
      var encryptedMessage = CryptoAES.encrypt(secretMessage, secretKey);
      // var idhash = encryptedMessage
      idhash = encryptedMessage.toString(CryptoAES.Utf8);
      this.setState({idhash: idhash});
    }

    if (this.state.first_name === '' || this.state.last_name === '' || this.state.dni === '') {
      this.setState({send: true});
      return;
    }
    const body = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      dni: this.state.dni,
      idhash: idhash,
      loginType: '10',
    };

    var fechType = '';
    if (localStorage.loginType === '7') {
      fechType = 'https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/registerDNIIngresosQR';
    } else {
      fechType = 'https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/registerSimpleNewQR';
    }
    // eslint-disable-next-line
    var response = fetch(fechType, {
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
          this.setState({error: response + '', loading: false, email: ''});
        }
      })
      .then(response => {
        if (response) {
          if (!response.error) {
            if (localStorage.loginType === '7') {
              this.sendMail();
            } else {
              console.log(response);
              this.setState({loading: false, error: 'ALTA EXITOSA'});
            }
            this.cleandatos();
            this.setState({
              loading: false,
            });
          } else {
            this.setState({error: response.error, loading: false});
            this.cleandatos();
          }
        }
      })

      .catch(error => {
        this.setState({error: error + '', loading: false});
      });
  }

  sendMail() {
    const body2 = {
      email: this.state.email,
      dni: this.state.dni,
      idhash: this.state.idhash,
      phone: this.state.phone,
    };

    // eslint-disable-next-line
    var response = fetch('https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/loginUsersQR', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body2),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          this.setState({error: response, loading: false});
        }
      })
      .then(response => {
        if (!response.error) {
          this.cleandatos();
          this.setState({error: 'ALTA EXITOSA', loading: false});
        } else {
          this.cleandatos();
          this.setState({error: 'USUARIO EXISTENTE', loading: false});
        }
      })
      .catch(error => {
        this.setState({error: error + 'USUARIO EXISTENTE', loading: false});
      });
  }

  cleandatos() {
    document.getElementById('dni').value = '';
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
    if (localStorage.loginType === '7') {
      document.getElementById('email').value = '';
    }
  }

  salir() {
    localStorage.clear();
    document.location.href = '/Login';
  }

  render() {
    var errorColor = '#c01d47';
    if (this.state.error === 'ALTA EXITOSA' || this.state.error === 'DNI VALIDO Y ACREDITADO') {
      errorColor = '#0f0f';
    }
    var vtitulo1 = '';
    if (localStorage.loginType === '7') {
      vtitulo1 = 'REGISTRO INVITADOS Y ACREDITACION';
    } else {
      vtitulo1 = 'REGISTRO INVITADOS SIMPLE';
    }
    // eslint-disable-next-line
    const height = window.innerHeight;
    // eslint-disable-next-line
    const min = window.innerWidth >= 1000;
    // eslint-disable-next-line
    const minxs = window.innerWidth <= 700;
    // eslint-disable-next-line
    var disabledbutton = false;
    // eslint-disable-next-line
    const email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    // eslint-disable-next-line
    const width = window.innerWidth < 1000;

    var header = (
      <Grid item xs={12} sm={12} l={3} md={3} lg={4} style={{height: '100%', display: 'flex'}}>
        <p
          onClick={this.salir}
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '2em',
            color: 'white',
            right: 0,
            top: 0,
            padding: '1%',
            position: 'absolute',
          }}>
          X
        </p>
        <div
          style={{
            flexDirection: 'column',
            display: 'flex',
            justifycontent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <img alt="imagen1" height="auto" width={minxs ? '50%' : '100%'} style={{marginLeft: 30, marginTop: 50, maxWidth: 200}} src={logoVeteGrande} />
          <img
            alt="imagen1"
            style={{
              width: 100,
              height: 40,
              position: 'absolute',
              bottom: 10,
              left: 10,
            }}
            src={logoNovo}></img>
        </div>
      </Grid>
    );

    const h = window.innerHeight;
    if (window.matchMedia('screen and (max-width: 768px)').matches) {
      header = (
        <Grid item xs={12} sm={12} md={4} l={4} lg={4}>
          <p
            onClick={this.salir}
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '2em',
              color: 'white',
              right: 0,
              top: 0,
              padding: '1%',
              position: 'absolute',
            }}>
            X
          </p>
          <img alt="imagen1" height="auto" width={minxs ? '50%' : '100%'} style={{marginTop: 50, maxWidth: 200}} src={logoVeteGrande} />
          <div
            style={{
              display: 'flex',
              justifycontent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}></div>
        </Grid>
      );
    }

    return (
      <div style={{display: 'flex'}}>
        <div
          style={{
            display: 'flex',
            justifycontent: 'center',
            backgroundImage: `url(${Background})`,
            minHeight: h,
            height: '100%',
            width: '100%',
            position: 'absolute',
            backgroundSize: 'cover',
          }}>
          <Grid container direction="row" style={{height: '100%'}}>
            {header}
            <Grid item xs={12} sm={12} md={9} l={9} lg={8} style={{}}>
              <Grid container direction="column" justifycontent="center" alignItems="center" style={{height: '100%', marginTop: 1}}>
                <p
                  className="titleFormTitle"
                  style={{
                    color: 'white',
                    padding: 10,
                    maxWidth: '500px',
                    fontSize: minxs ? '1.5em' : '2.5em',
                    marginTop: 2,
                    textAlign: min ? 'center' : 'center',
                  }}>
                  {' '}
                  {vtitulo1}
                </p>
                <Grid
                  item
                  style={{
                    background: 'white',
                    width: '90%',
                    padding: 30,
                    borderRadius: 30,
                  }}>
                  <Grid container direction="row" alignItems="center" style={{marginTop: 10}}>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      style={{
                        alignItems: 'start',
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <p className="textForm"> Nombre</p>
                      <p className="textFormError">{this.state.first_name === '' && this.state.send ? 'Campo requerido' : ''}</p>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      style={{
                        height: 30,
                      }}>
                      <input
                        style={{
                          height: 30,
                          borderRadius: 0,
                          borderColor: colors.gray,
                          borderWidth: 1,
                          borderStyle: 'solid',
                          backgroundColor: '#CDCDCD',
                          width: '100%',

                          border: 'none',
                        }}
                        type="text"
                        required
                        id="first_name"
                        className="no-outline"
                        onChange={event =>
                          this.setState({
                            send: false,
                            first_name: event.target.value,
                            error: null,
                          })
                        }></input>
                    </Grid>
                    <Grid container direction="row" alignItems="center" style={{marginTop: 10}}>
                      <Grid
                        item
                        xs={12}
                        sm={2}
                        style={{
                          alignItems: 'start',
                          display: 'flex',
                          flexDirection: 'column',
                        }}>
                        <p className="textForm"> Apellido</p>
                        <p className="textFormError">{this.state.last_name === '' && this.state.send ? 'Campo requerido' : ''}</p>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={10}
                        style={{
                          height: 30,
                          borderRadius: 0,
                        }}>
                        <input
                          style={{
                            height: 30,
                            borderRadius: 0,
                            borderColor: colors.gray,
                            borderWidth: 1,
                            borderStyle: 'solid',
                            backgroundColor: '#CDCDCD',
                            width: '100%',

                            border: 'none',
                          }}
                          type="text"
                          required
                          id="last_name"
                          className="no-outline"
                          onChange={event =>
                            this.setState({
                              send: false,
                              last_name: event.target.value,
                              error: null,
                            })
                          }></input>
                      </Grid>
                    </Grid>
                  </Grid>

                  {localStorage.loginType === '7' && (
                    <>
                      <Grid container direction="row" alignItems="center" style={{marginTop: 10}}>
                        <Grid
                          item
                          xs={12}
                          sm={2}
                          style={{
                            alignItems: 'start',
                            display: 'flex',
                            flexDirection: 'column',
                          }}>
                          <p className="textForm"> CELULAR</p>
                          <p className="textFormError">{this.state.first_name === '' && this.state.send ? 'Campo requerido' : ''}</p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={10}
                          style={{
                            height: 30,
                            borderRadius: 0,
                          }}>
                          <input
                            style={{
                              height: 30,
                              borderRadius: 0,
                              borderColor: colors.gray,
                              borderWidth: 1,
                              borderStyle: 'solid',
                              backgroundColor: '#CDCDCD',
                              width: '100%',
                              border: 'none',
                            }}
                            type="number"
                            required
                            id="phone"
                            placeholder={'ej.: 011xxxxxxx'}
                            className="no-outline"
                            onChange={event =>
                              this.setState({
                                send: false,
                                phone: event.target.value,
                                error: null,
                              })
                            }></input>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" alignItems="center" style={{marginTop: 10}}>
                        <Grid
                          item
                          xs={12}
                          sm={2}
                          style={{
                            alignItems: 'start',
                            display: 'flex',
                            flexDirection: 'column',
                          }}>
                          <p className="textForm"> Email</p>
                          <p className="textFormError">{this.state.email === '' && this.state.send ? 'Campo requerido' : ''}</p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={10}
                          style={{
                            height: 30,
                            borderRadius: 8,
                          }}>
                          <input
                            style={{
                              height: 30,
                              borderRadius: 0,
                              borderColor: colors.gray,
                              borderWidth: 1,
                              borderStyle: 'solid',
                              backgroundColor: '#CDCDCD',
                              width: '100%',
                              border: 'none',
                            }}
                            type="email"
                            required
                            id="email"
                            placeholder={'ej.: ejemplo@gmail.com'}
                            className="no-outline"
                            onChange={event =>
                              this.setState({
                                send: false,
                                email: event.target.value,
                                error: null,
                              })
                            }></input>
                        </Grid>
                      </Grid>
                    </>
                  )}
                  <Grid container direction="row" alignItems="center" style={{marginTop: 10}}>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      style={{
                        alignItems: 'start',
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <p className="textForm"> DNI</p>
                      <p className="textFormError">{this.state.dni === '' && this.state.send ? 'Campo requerido' : ''}</p>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      style={{
                        height: 30,
                        borderRadius: 8,
                        borderColor: colors.gray,
                      }}>
                      <input
                        style={{
                          height: 30,
                          borderRadius: 0,
                          borderColor: colors.gray,
                          borderWidth: 1,
                          borderStyle: 'solid',
                          backgroundColor: '#CDCDCD',
                          width: '100%',

                          border: 'none',
                        }}
                        type="number"
                        required
                        id="dni"
                        min="10000000"
                        placeholder={'ej.: XXXXXXXX'}
                        className="no-outline"
                        onChange={event =>
                          this.setState({
                            send: false,
                            dni: event.target.value,
                            error: null,
                          })
                        }></input>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{marginTop: 20, alignItems: 'start'}}>
                    {this.state.error && (
                      <div
                        style={{
                          width: '300px',
                          display: 'block',
                          position: 'fixed',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: errorColor,
                          border: '1px solid #FFFFFF',
                          color: '#000000',
                          padding: '20px',
                          borderRadius: '10px',
                          textAlign: 'center',
                          zIndex: 999,
                        }}>
                        <div
                          style={{
                            position: 'absolute',
                            top: '-15px',
                            right: '-15px',
                            cursor: 'pointer',
                            backgroundColor: '#FFFFFF',
                            fontSize: '24px',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            border: 'none',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onClick={() => this.setState({error: false})}>
                          X
                        </div>
                        <p
                          style={{
                            fontSize: '1.5em',
                            borderRadius: 2,
                            margin: 10,
                            marginTop: 20,
                            color: 'white',
                            fontFamily: 'Montserrat-SemiBold',
                          }}>
                          {this.state.error}
                        </p>
                      </div>
                    )}

                    <Grid item xs={9} sm={11} style={{display: 'flex', alignItems: 'center'}}></Grid>
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifycontent: 'flex-end',
                        marginTop: 10,
                      }}>
                      <button
                        onClick={() => this.register()}
                        disabled={disabledbutton}
                        type="submit"
                        style={{
                          padding: 0,
                          cursor: 'pointer',
                          border: 'none',
                          backgroundColor: '#102D69',
                        }}>
                        <img alt="imagen1" width="150px" height="auto" src={Registrarse}></img>
                      </button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Register;
