import {Button, Grid} from '@material-ui/core';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import React, {Component} from 'react';
import logo from '.././assets/Logo.png';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {default as Background, default as BackgroundF} from '../assets/Fondos/fondo1.png';

const date = new Date(); // Define date here
let counter = 0; // Define counter here
class Qrcodes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      decodedResults: [],
      qrdata: '',
      error: '',
      fechaIngresoD: date.toLocaleDateString('es-ES', 'DD/MM/YYYY'),
      horaIngreso: date.toLocaleTimeString('es-ES', 'hh/mm/ss'),
      id: 'x',
      decotextId: '',
      check1: true,
      check2: false,
      check3: false,
      drinkType: '',
      abierto: false,
      name: '',
      close: false,
    };

    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  onNewScanResult(decodedText, decodedResult) {
    this.setState((state, props) => {
      state.decodedResults.push(decodedResult);
      return state;
    });

    if (!(this.state.id === decodedText)) {
      this.setState({decotextId: decodedText});
      if (this.state.error === '') {
        this.upDateQR(decodedText);
      }
    }
  }
  registDni() {
    document.location.href = '/RegisterSinQR';
  }

  upDateQR(decodedText) {
    counter = counter + 1;
    var resultadosplit = decodedText.split('*');
    var response = 'qr';
    if (response === 'qr') {
      // Do something with the response
    }
    this.setState({
      qrdata: resultadosplit,
    });

    var fechType = '';
    var secretKey = 'lamarquesh2022';
    var _ciphertext = CryptoAES.decrypt(decodedText.toString(), secretKey);
    var dniqr = _ciphertext.toString(CryptoENC).substring(0, 8);
    //console.log('acaqr', dniqr)
    if (dniqr === '') {
      this.setState({error: 'QR No VALIDO'});
      return;
    } else {
      if (!(this.state.id === decodedText)) {
        const body = {
          dni: dniqr,
          idhash: decodedText,
          fechaUso: date.toLocaleDateString(),
          horaUso: date.toLocaleTimeString(),
        };
        this.setState({
          id: decodedText,
        });

        if (localStorage.loginType === '2' || localStorage.loginType === '7') {
          fechType = 'https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/updateQrcodeIn';
        }

        response = fetch(fechType, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(body),
        })
          .then(response => {
            if (response.status === 200) {
              this.setState({error: response.error});
              return response.json();
            } else {
              this.setState({error: response.error});
            }
          })
          .then(response => {
            if (response) {
              if (!response.error) {
                this.setState({
                  error: response.error,
                  abierto: true,
                });
              } else {
                // console.log('segundo error', response.error, response.data);
                this.setState({
                  error: response.error,
                  abierto: true,
                  name: response.data,
                });
              }
            }
          })
          .catch(error => {
            this.setState({error: error, loading: false});
          });
      } else {
        this.setState({error: this.state.error + 'QR RECIEN LEIDO', abierto: true});
      }
    }
  }

  close() {
    this.setState({close: !this.state.close});
  }

  closeTotal() {
    localStorage.clear();

    document.location.href = '/Login';
  }

  closeModal = () => {
    this.setState({error: '', abierto: false, id: this.state.decotextId});
  };

  radioButton = (field, value) => {
    if (field === 'check1') {
      this.setState({
        check1: true,
        check2: false,
        check3: false,
        drinkType: '1',
      });
    }
    if (field === 'check2') {
      this.setState({
        check1: false,
        check2: true,
        check3: false,
        drinkType: '2',
      });
    }
    if (field === 'check3') {
      this.setState({
        check1: false,
        check2: false,
        check3: true,
        drinkType: '3',
      });
    }
  };

  render() {
    var errorColor = '#D4AF37';
    if (this.state.error === 'CODIGO QR VALIDO, Haz Click Aqui') {
      errorColor = '#0f0f';
    } else if (this.state.error === 'DNI VALIDO Y ACREDITADO') {
      errorColor = '#0f0f';
    } else if (this.state.error === 'ELIGE UNA BEBIDA') {
      errorColor = '#D4AF37';
    } else if (this.state.error === 'QR RECIEN LEIDO') {
      errorColor = '#D4AF37';
    } else {
      errorColor = '#c01d47';
    }

    var back = window.innerWidth >= 1000 ? Background : BackgroundF;
    const min = window.innerWidth >= 790;
    return (
      <div className="App" style={{width: window.innerWidth, backgroundImage: `url(${back})`, height: window.innerHeight, backgroundSize: '100% 100%'}}>
        <div>
          <section>
            <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center'}}>
              <span>
                <Button style={{marginRight: 30}} onClick={() => this.registDni()}>
                  <p style={{marginTop: 10, position: 'absolute', fontSize: 40, color: 'white', fontWeight: 'bold', paddingRight: 20, width: '60px', height: 'auto'}}>DNI</p>
                </Button>
                <img src={logo} style={{width: '180px', height: 'auto', marginTop: 10}} alt="logo" />
                <Button style={{marginLeft: 30}} onClick={() => this.close()}>
                  <p style={{marginTop: 10, position: 'absolute', fontSize: 40, color: 'white', fontWeight: 'bold', paddingLeft: 20, width: '60px', height: 'auto'}}>X</p>
                </Button>
              </span>
            </div>
            <Grid style={{alignItems: 'start', flexDirection: 'column', display: 'flex'}}>
              <div results={this.state.decodedResults} />
            </Grid>
            <br />
            <Html5QrcodePlugin fps={10} qrbox={300} disableFlip={false} qrCodeSuccessCallback={this.onNewScanResult} />
            <div results={this.state.decodedResults} />
            <div className="Result-section">
              <div className="Qrcode-result-table" data={this.props.results} />
            </div>
          </section>
        </div>
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
          <ModalBody style={{alignItems: 'center', alignContent: 'center', padding: 20}}>
            {localStorage.loginType === '2'
              ? this.state.error && (
                  <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20}}>
                    <p style={{textAlign: 'center', fontWeight: 'bold', color: '#000', fontSize: 20}}>{this.state.name}</p>
                    <Button onClick={this.closeModal} type="submit" style={{cursor: 'pointer', borderRadius: 2, margin: 2, marginTop: 10, backgroundColor: errorColor, color: '#ffff', fontSize: 18}}>
                      {this.state.error}
                    </Button>
                  </div>
                )
              : this.state.error && (
                  <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20}}>
                    <p style={{textAlign: 'center', fontWeight: 'bold', color: '#000', fontSize: 20}}>{this.state.name}</p>
                    <Button onClick={this.closeModal} type="submit" style={{cursor: 'pointer', borderRadius: 2, margin: 2, marginTop: 10, backgroundColor: errorColor, color: '#ffff', fontSize: 18}}>
                      {this.state.error}
                    </Button>
                  </div>
                )}
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.close}
          style={{
            position: 'absolute',
            left: min ? '30%' : '0',
            top: '10%',
            width: min ? '500px' : '350px',
            height: '600px',
          }}>
          <ModalHeader style={{alignItems: 'center', alignContent: 'center'}}>
            <div style={{flex: 1}}>{this.state.typeButton === 1 ? <p style={{marginLeft: 20, padding: 30, alignContent: 'center', textAlign: 'center', fontSize: 40, fontWeight: 'bold'}}>SALE DE VENTAS DE ENTRADAS?</p> : <p style={{marginLeft: 20, padding: 30, alignContent: 'center', textAlign: 'center', fontSize: 40, fontWeight: 'bold'}}> CIERRA APLICACION?</p>}</div>
          </ModalHeader>
          <ModalFooter>
            <span style={{marginLeft: 0, padding: 20}}>
              <Button onClick={() => this.close()} style={{backgroundColor: '#2e2d2c', color: '#ffff', height: '50px', width: '100px', padding: 20}}>
                CANCELAR
              </Button>
            </span>
            <Button onClick={() => this.closeTotal()} style={{backgroundColor: '#EA580C', color: '#ffff', height: '50px', width: '120px', padding: 20}}>
              CONFIRMAR
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Qrcodes;
