import React from 'react';

import {Button, Grid} from '@material-ui/core';
import Background from '../assets/Fondos/fondo1.png';

import logoVeteGrande from '../assets/Logo.png';

import logoNovo from '../assets/Logos/logo-marquez-menu.png';

import Registrarse from '../assets/Botones/enviar-01.png';
import {colors} from '../utils';
import './Main.css';

import CryptoAES from 'crypto-js/aes';
import {Modal, ModalBody} from 'reactstrap';

var date = new Date();

class RegisterSinQR extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      dni: '',
      error: null,
      loading: false,
      abiert: false,
      send: false,
      fechaIngreso: date.toLocaleDateString('es-ES', 'D/M/YYYY'),
      horaIngreso: date.toLocaleTimeString('es-ES', 'h/m/ss'),
      buttonDisabled: false,
    };
  }

  register() {
    this.setState({send: true});
    if (this.state.dni === '') {
      return;
    }

    this.setState({
      error: null,
      loading: true,
    });

    var secretMessage = this.state.dni;
    var secretKey = 'lamarquesh2022';

    // var idhash = CryptoJS.AES.encrypt((i + localStorage.dni + this.state.fechaIngreso + tickettype), 'cruz').toString()
    var encryptedMessage = CryptoAES.encrypt(secretMessage, secretKey);
    // var idhash = encryptedMessage
    var idhash = encryptedMessage.toString(CryptoAES.Utf8);

    const body = {
      dni: this.state.dni,
      fechaIngreso: this.state.fechaIngreso,
      horaUso: this.state.horaIngreso,
      idhash: idhash,
    };

    var vfetch = '';

    if (localStorage.loginType === '7') {
      vfetch = 'https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/regsiterDNIingresosM';
    } else {
      vfetch = 'https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/registersimpleSinQRM';
    }
    // eslint-disable-next-line
    var response = fetch(vfetch, {
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
          this.setState({
            error: response + '',
            abierto: true,
            loading: false,
          });
        }
      })
      .then(response => {
        if (response) {
          if (!response.error) {
            this.setState({
              error: 'DNI VERIFICADO',
              abierto: true,
              loading: false,
            });
          } else {
            this.cleandatos();
            this.setState({
              error: response.error,
              abierto: true,
              loading: false,
            });
          }
        }
      })

      .catch(error => {
        this.setState({error: error + '', loading: false});
      });
  }

  cleandatos() {
    document.getElementById('dni').value = ' ';
    this.setState({buttonDisabled: false});
  }

  closeModal = () => {
    this.setState({error: '', abierto: false});
  };

  goback() {
    document.location.href = '/Qrcodes';
  }
  render() {
    var errorColor = '#c01d47';
    if (this.state.error === 'DNI VALIDO') {
      errorColor = '#0f0f';
    } else if (this.state.error === 'DNI VALIDO Y ACREDITADO') {
      errorColor = '#0f0f';
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
    var vtitulo1 = '';
    if (localStorage.loginType === '7') {
      vtitulo1 = 'REGISTRO DNI Y ACREDITACION';
    } else {
      vtitulo1 = 'ACREDITACION POR DNI EXISTENTE';
    }
    var header = (
      <Grid item xs={12} sm={12} l={3} md={3} lg={4} style={{height: '100%', display: 'flex'}}>
        <p
          onClick={this.goback}
          style={{
            marginTop: 10,
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
          <img alt="imagen1" height="auto" width="100%" style={{marginLeft: 30, marginTop: 50, maxWidth: 400}} src={logoVeteGrande} />

          <img
            alt="imagen1"
            style={{
              width: '10%',
              height: 'auto',
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
            onClick={this.goback}
            style={{
              marginTop: 10,
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
          <img alt="imagen1" height="auto" width="70%" style={{marginTop: 50, maxWidth: 500}} src={logoVeteGrande} />
          <div
            style={{
              display: 'flex',
              justifycontent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}>
            {/*<img style={{ width: '20%', height: 'auto', position: 'absolute', bottom: 10, left: 10 }} src={logoNovo}></img>*/}
          </div>
        </Grid>
      );
    }

    return (
      <div style={{overflowY: 'scroll', display: 'flex'}}>
        <div
          style={{
            display: 'flex',
            justifycontent: 'center',
            backgroundImage: `url(${Background})`,
            minHeight: h,
            height: '100vh',
            width: '100%',
            backgroundSize: 'cover',
          }}>
          <Grid container direction="row" style={{height: '100%'}}>
            {header}
            <Grid item xs={12} sm={12} md={9} l={9} lg={8} style={{}}>
              <Grid container direction="column" justifycontent="center" alignItems="center" style={{height: '100%', marginTop: 20}}>
                <p
                  onClick={this.goback}
                  style={{
                    marginTop: 10,
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
                <p
                  className="titleFormTitle"
                  style={{
                    padding: 20,
                    marginTop: 20,
                    textAlign: min ? 'right' : 'center',
                    color: 'white',
                  }}>
                  {' '}
                  {vtitulo1}
                </p>
                <Grid
                  item
                  style={{
                    background: 'white',
                    width: '90%',
                    padding: 10,
                    borderRadius: 30,
                  }}>
                  <div style={{marginTop: 0}}>
                    <p className="titleFormTitle"> SCAN</p>
                  </div>
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
                        borderWidth: 1,
                        borderStyle: 'solid',
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
                        placeholder={'xxxxx'}
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
                    <Modal
                      isOpen={this.state.abierto}
                      style={{
                        position: 'absolute',
                        padding: 20,
                        top: '30%',
                        width: '90%',
                        left: '3%',
                        height: 'auto',
                      }}>
                      <ModalBody
                        style={{
                          alignItems: 'center',
                          alignContent: 'center',
                          padding: 20,
                        }}>
                        {localStorage.loginType === '2'
                          ? this.state.error && (
                              <div
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  padding: 20,
                                }}>
                                <p
                                  style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: '#000',
                                    fontSize: 20,
                                  }}>
                                  {this.state.name}
                                </p>
                                <Button
                                  onClick={this.closeModal}
                                  type="submit"
                                  style={{
                                    cursor: 'pointer',
                                    borderRadius: 2,
                                    margin: 2,
                                    marginTop: 10,
                                    backgroundColor: errorColor,
                                    color: '#ffff',
                                    fontSize: 18,
                                  }}>
                                  {this.state.error}
                                </Button>
                              </div>
                            )
                          : this.state.error && (
                              <div
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  padding: 20,
                                }}>
                                <p
                                  style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: '#000',
                                    fontSize: 20,
                                  }}>
                                  {this.state.name}
                                </p>
                                <Button
                                  onClick={this.closeModal}
                                  type="submit"
                                  style={{
                                    cursor: 'pointer',
                                    borderRadius: 2,
                                    margin: 2,
                                    marginTop: 10,
                                    backgroundColor: errorColor,
                                    color: '#ffff',
                                    fontSize: 18,
                                  }}>
                                  {this.state.error}
                                </Button>
                              </div>
                            )}
                      </ModalBody>
                    </Modal>

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
                        disabled={this.state.buttonDisabled}
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

export default RegisterSinQR;
