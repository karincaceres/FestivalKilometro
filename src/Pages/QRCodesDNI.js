
import React from 'react';
import { Grid , Button} from '@material-ui/core';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'
import logo from '.././assets/Logos/logo_250.png'
import CryptoAES from 'crypto-js/aes'
import CryptoENC from 'crypto-js/enc-utf8';

import Background from '../assets/Fondos/fondo2_1080x1920.jpg'

import BackgroundF from '../assets/Fondos/FondosSmall/fondo2_375x667.jpg'
import {  Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
var date = new Date();
var counter = 0
class QRCodesDNI extends React.Component {
  constructor(props) {
      super(props);

    this.state = {
        decodedResults: [],
        qrdata: "",
        error:"",
        fechaIngreso:date.toLocaleDateString('es-ES', 'DD/MM/YYYY'),
        horaIngreso:date.toLocaleTimeString('es-ES', 'hh/mm/ss'),
        id: "x",
        decotextId: "",
        check1: true,
        check2: false,
        check3: false,
        drinkType: "",
        abierto: false,
        close: false
    }

    // This binding is necessary to make `this` work in the callback.
      this.onNewScanResult = this.onNewScanResult.bind(this);

  }



 onNewScanResult(decodedText, decodedResult) {
    //  "App [result]", decodedResult);
    // let decodedResults = this.state.decodedResults;
    // decodedResults.push(decodedResult);
    this.setState((state, props) => {
        state.decodedResults.push(decodedResult);

        //if (localStorage.loginType === '2') {
        //    this.setState({ error: "ELIGE UNA BEBIDA" })
        //}
        return state;

    });
     if (!(this.state.id === decodedText)) {
         this.setState({ decotextId: decodedText })
         if (this.state.error === "") {
             this.upDateQR(decodedText)
         }
     }
    };

    upDateQR(decodedText) {
        counter = counter + 1
       // decodedText = "005777897@CACERES@KARIN@F@92771033@B@06/11/1969@21/01÷2019@277"
        var resultadosplit = decodedText.split("@")
        var vdni=resultadosplit[4]
        decodedText=vdni

        var response = "qr"
       if (response === "qr") {

        }
        this.setState ({
            qrdata: resultadosplit,
        })
        var fechType = ""
        var secretKey = 'lamarquesh2022'

        var _ciphertext = CryptoAES.decrypt(decodedText.toString(), secretKey);

        var dniqr = (_ciphertext.toString(CryptoENC)).substring(0, 8)
     //   console.log(dniqr, decodedText)
        if (dniqr === "") {

            this.setState({ error: "QR No VALIDO" })
            return
        } else {
            if (!(this.state.id === decodedText)) {

                const body = {
                    dni: dniqr,
                    idhash: decodedText,
                    fechaUso: this.state.fechaIngreso,
                    horaUso: this.state.horaIngreso
                }
               // console.log(body, localStorage.loginType)
                this.setState({
                    id: decodedText
                })


                    fechType = "https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/updateQRcodeIn"


                response = fetch(fechType, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(body)
                })
                    .then((response) => {
                        if (response.status === 200) {
                            this.setState({ error: response.error + "" })
                            return response.json();

                        } else {
                            this.setState({ error: response.error + "" })
                        }
                    })
                    .then((response) => {
                        if (response) {
                           // console.log('EERRR', response)
                            if (!response.error) {

                                this.setState({
                                    error: response.error + "", abierto: true
                                })
                            } else {
                                //console.log('segundo error', response.error)
                                this.setState({ error: response.error, abierto: true })
                            }
                        }
                    })

                    .catch(error => {
                        this.setState({ error: error + "", loading: false })
                    });

            } else {

                this.setState({ error: this.state.error + "QR RECIEN LEIDO" , abierto: true })


            }
        }

    };
close() {
         this.setState({ close: !this.state.close})

    }
 closeTotal() {
        localStorage.clear()

        document.location.href = '/Login'

 }


 closeModal = () => {
     this.setState({ error: "", abierto: false, id: this.state.decotextId });
    //  console.log('cuarto error')
  };
    radioButton = (field, value) => {
        if (field === "check1") {
            this.setState({
                check1: true,
                check2: false,
                check3: false,
                drinkType:"1"
            })
        }
        if (field === "check2") {
            this.setState({
                check1: false,
                check2: true,
                check3: false,
                drinkType:"2"
            })
        }
        if (field === "check3") {
            this.setState({
                check1: false,
                check2: false,
                check3: true,
                drinkType:"3"
            })
        }
    };


    registDni() {
          document.location.href = '/RegisterSinQR'
    }
    render() {


      //  console.log('QUE ERROR DA',this.state.error)
        var errorColor = '#D4AF37'
        if (this.state.error === "DNI VALIDO")  {

            errorColor = '#0f0f'
        } else if (this.state.error === "DNI VALIDO Y ACREDITADO") {
            errorColor = '#0f0f'
         } else if
        (this.state.error === "ELIGE UNA BEBIDA") {

            errorColor = '#D4AF37'
        } else if
            (this.state.error === "QR RECIEN LEIDO"){

            errorColor = '#D4AF37'
        } else {

            errorColor ='#c01d47'
        }
        var back = Background
        const min = window.innerWidth >= 1000
        if (min) {
            back = Background
        } else {
            back = BackgroundF
        }


    return (
        <div className="App" style={{ width: window.innerWidth, height: window.innerHeight,  backgroundImage:`url(${back})`,backgroundSize: 'cover' }}>
    <div>
            <section >
                <div style={{display:'flex', flexDirection:'column', alignContent:'center', alignItems:'center'}}>
                    <span>
                        <Button style={{marginRight: 30}}   onClick={() => this.registDni()}>
                            <p style={{marginTop:10, position: 'absolute', fontSize:40, color:'white', fontWeight:'bold',  paddingRight:  20 , width:'60px', height: 'auto'}}>DNI</p>
                        </Button>
                        <img src={logo} style={{ width: '200px', height: 'auto' }} alt='logo'></img>
                        <Button style={{marginLeft: 30}}   onClick={() => this.close()}>
                            <p style={{ marginTop: 10,position: 'absolute', fontSize:40, color:'white', fontWeight:'bold',  paddingLeft:  20 , width:'60px', height: 'auto'}}>X</p>
                        </Button>
                    </span>
                </div>
                <Grid style={{ alignItems: 'start', flexDirection: 'column', display: 'flex' }}>
                    {/*{(localStorage.loginType === '2') ?
                        <div style={{ textAlign: 'left', width: '100%', alignItems: 'start' }}>

                            <input className='radio' type="radio" style={{fontSize:30}} checked={this.state.check1} onChange={(value) => this.radioButton('check1', value)} /><span className='radioB'>CERVEZA</span>
                            <span style={{ marginLeft: 30 }} ></span>
                            <input  className='radio' type="radio" checked={this.state.check2} onChange={(value) => this.radioButton('check2', value)} /><span className='radioB'>GIN</span>
                            <span style={{ marginLeft: 30 }} ></span>
                            <input  className='radio' type="radio" checked={this.state.check3} onChange={(value) => this.radioButton('check3', value)} /><span className='radioB'>CAMPARI</span>
                            <span style={{ marginLeft: 30 }} ></span>
                            <br></br>

                            <Button onClick={() => this.onSubmit()} type='submit' style={{ marginTop:20, padding: 10,fontSize: '20px', fontWeight:'bold,', height: '40px', width: '100%', padding: 0, cursor: 'pointer', border: 'none', background: 'yellow' }}>
                                GUARDAR
                            </Button>
                        </div>
                        :
                              <span style={{ marginLeft: 30 }} ></span>
                    }*/}
                     <div results={this.state.decodedResults} />
                </Grid>

                {/*<p style={{ textTransform: 'uppercase' }} >{this.state.qrdata[0]}  {this.state.qrdata[1]} {this.state.qrdata[3]}</p>*/}

                <br></br>
            <Html5QrcodePlugin
                fps={10}
                qrbox={{ width:300, height:100}}
                disableFlip={false}
                rememberLastUsedCamera={true}
                qrCodeSuccessCallback={this.onNewScanResult} />
                <div results={this.state.decodedResults} />
                 <div className='Result-section'>
                    <div className= 'Qrcode-result-table' data={this.props.results} />
                </div>
            </section>
    </div>
  <Modal isOpen={this.state.abierto} style={{
          position: 'absolute', padding: 20, top: '30%', width: '90%', left: '3%', height: 'auto'
        }}>
          <ModalBody style={{ alignItems: 'center', alignContent: 'center', padding: 20 }}>
            {(localStorage.loginType === '2') ?
              this.state.error &&
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 }}>
                <p style={{ textAlign: 'center', fontWeight: 'bold', color: '#000', fontSize: 20 }}>{this.state.name}</p>
                <Button onClick={this.closeModal} type='submit' style={{ cursor: 'pointer', borderRadius: 2, margin: 2, marginTop: 10, backgroundColor: errorColor, color: '#ffff', fontSize: 18 }}>{this.state.error}</Button>
              </div>
              :
              this.state.error &&
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 }}>
                <p style={{ textAlign: 'center', fontWeight: 'bold', color: '#000', fontSize: 20 }}>{this.state.name}</p>
                <Button onClick={this.closeModal} type='submit' style={{ cursor: 'pointer', borderRadius: 2, margin: 2, marginTop: 10, backgroundColor: errorColor, color: '#ffff', fontSize: 18 }}>{this.state.error}</Button>
              </div>
            }
          </ModalBody>
        </Modal>
             <Modal isOpen={this.state.close} style={{
                             position: "absolute", left: min?"30%": "0", top: '10%', width: min?'500px': '400px', height: '600px',
                            }}>
                        <ModalHeader  style={{ alignItems: 'center', alignContent: 'center' }}>
                            <div style={{ flex: 1, }}>
                                {this.state.typeButton === 1 ?
                                    <p style={{ marginLeft:20, padding:30, alignContent: 'center', textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}>SALE DE VENTAS DE ENTRADAS?</p>
                                :
                                    <p style={{ marginLeft:20, padding:30, alignContent: 'center', textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}> CIERRA APLICACION?</p>
                                }
                                </div>
                        </ModalHeader>
                        <ModalFooter>
                                <span style={{marginLeft:0,padding:20}}>
                            <Button onClick={() => this.close()} style={{  backgroundColor: '#2e2d2c', color: '#ffff', height: '50px', width: '100px', padding: 20 }}>CANCELAR</Button>
                                </span>
                            <Button onClick={() => this.closeTotal()} style={{ backgroundColor: '#EA580C', color: '#ffff', height: '50px', width: '120px', padding: 20 }}>CONFIRMAR</Button>

                        </ModalFooter>
                    </Modal>

</div>

    );
  }


}

export default QRCodesDNI;
