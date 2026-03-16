import React from "react";
import PropTypes from "prop-types";

import Header from './Header.js'
import Footer from './Footer.js'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button, Dialog, Box} from '@material-ui/core';
import Background from '../assets/Fondos/fondo4_1080x1920.jpg'
import BackgroundR from '../assets/Fondos/Fondos media/fondo4_720x1280.jpg'
import BackgroundF from '../assets/Fondos/FondosSmall/fondo4_375x667.jpg'

import {colors} from '../utils'
import verTutorial from '../assets/Botones/tutorial-01.png'
import Ticket from '../assets/Botones/e-ticket.png'
import liner from '../assets/Fondos/linetit-01S.png'
import './Main.css'
import Ingresar from '../assets/ingresar.png'
import logofooter1 from '../assets/logo_cabure.png'
import cerrar from '../assets/Botones/cerrar-01.png'
var disabled = false

const isMobileMid = window.innerWidth > 300 & window.innerWidth <= 320
const isMobileFloor = window.innerWidth > 320 & window.innerWidth <= 430
const isTabletMid = window.innerWidth > 430 & window.innerWidth <= 768
const isTabletCeil = window.innerWidth > 768 & window.innerWidth <= 1024
const isLaptopCeil = window.innerWidth > 1024 & window.innerWidth <= 1440
const isXHDCeil = window.innerWidth > 1440

var date = new Date();
class Evento extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            abierto: false,
            close: false,
            showPopup: false,
            loading: false,
            video:false,
            fechaIngreso:date.toLocaleDateString('es-ES', 'D/M/YYYY'),
            horaIngreso:date.toLocaleTimeString('es-ES', 'h/m/ss')
        };
        if (localStorage.primerLogin === "1") {
             disabled = true

        }
    }

    envioTicket() {
        disabled = true
         this.setState({  loading: true })
        const body = {
            dni: localStorage.dni,
            fechaIngreso: this.state.fechaIngreso
        }
        var response = fetch("https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/getticket", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(body)
        })

            .then((response) => {

                if (response.status == 200) {
                    return response.json();

                } else {
                    this.setState({ error: response + "", loading: false })
                }
            })
            .then((response) => {

                if (response) {

                    if (!response.error) {
                        disabled = true
                        this.setState({
                            loading: false,
                            close: true,
                            email: response.email,
                            showPopup: true
                        });

                    } else {
                        this.setState({ error: response.error, loading: false })
                    }
                }


            })


            .catch(error => {
                this.setState({ error: error + "", loading: false })
            });
    }
  closeModal() {
         this.setState({ close: false})

    }
    render() {
        const min = window.innerWidth >= 1400
        const mincel = window.innerWidth <= 500
        const mid = (window.innerWidth > 1000 & window.innerWidth < 1400)
        var back = Background;
        var justify = "center";
        var topCel = 0
        var vtextAlign = 'left'
        var vmarginTop = '0'
        var vmarginTopB = '0'
        var vmarginLeft = '10%'
        var vbarraSize = '80%'
        var vbotton = '80%'
        var button2 ='40%'
      var  vfontsize= '1.8em'
        if (isLaptopCeil) {
            back = BackgroundR
            topCel = '8%'
            vtextAlign = 'left'
            vmarginLeft = '10%'
            vmarginTop = '20%'
            vmarginTopB = '-2%'
            vbarraSize = '300px'
            vfontsize = '1.8em'
            vbotton = '35%'
             button2 ='40%'
        } else if (isMobileFloor) {
            topCel='2%'
            back = BackgroundF
            vtextAlign = 'center'
            vmarginLeft = '0'
            vmarginTop = '15%'
            vbarraSize = '80%'
            vfontsize = '2.1em'
            vmarginTopB = '-2%'
            vbotton = '80%'
             button2 ='80%'
        } else if (isXHDCeil) {
            vtextAlign = 'left'
            vmarginLeft ='10%'
            topCel='20%'
            back = Background
            vbarraSize = '100%'
            vtextAlign = 'left'
            topCel='20%'
            vmarginTop = '50%'
            vfontsize= '5.1em'
            vmarginTopB = '-2%'
            vbotton = '25%'
             button2 ='40%'
        }else if (isMobileMid) {
            topCel='2%'
            back = BackgroundF
            vtextAlign = 'center'
            vmarginLeft = '0'
            vmarginTop = '-1%'
            vbarraSize = '80%'
            vfontsize = '1.4em'
            vmarginTopB = '-10%'
                vbotton = '70%'
 button2 ='40%'
         }else if (isTabletMid) {
            topCel='-2%'
            back = BackgroundF
            vtextAlign = 'center'
            vmarginLeft = '0'
            vmarginTop = '15%'
            vbarraSize = '80%'
            vfontsize = '2.4em'
            vbotton = '70%'
            button2 ='40%'
        }else if (isTabletCeil) {
            topCel='2%'
            back = BackgroundF
            vtextAlign = 'center'
            vmarginLeft = '0'
            vmarginTop = '15%'
            vbarraSize = '80%'
            vfontsize = '2.1em'
            vmarginTopB = '-2%'
            vbotton = '80%'
            button2 ='80%'
        }

const height2 = window.innerHeight - 50
        return (
            <>
            <div style={{ width: '100%', flexDirection: 'column'}}>
                    <Grid item sm={12} xs={12} md={12} lg={12} style={{ width: window.innerWidth, height: height2, backgroundImage: `url(${back})`, backgroundSize: 'cover', marginRight: 0 }}>
                        {/*<img  src={liner} style={{marginTop:'-2%', zIndex:2000, width:'100%', height:'1%' }}></img>*/}
                    <Grid container direction='row' style={{height:'100%', width: '100%'}}>
                        <Grid item sm={12} xs={12} md={6} lg={6} style={{ }}>
                               <Grid container direction='column' alignItems={vtextAlign} style={{ marginTop:  '10%', width: '100%' }}>
                                    <p className="font-link" style={{ marginTop:min? '14%': '-1%', marginLeft: mincel?'0':'10%', textAlign:  mincel? 'center':'left' , color:'white', fontWeight:'bold', fontSize:vfontsize}} >¿CÓMO INGRESAR?</p>
                                    <div  style={{ marginTop:min? '-2.4%': '-1%', marginLeft:  mincel?'0':'10%', textAlign:  mincel? 'center':'left' }}>
                                        <img  src={liner} style={{ width:mincel?'80%': '300px', height:mincel?'10px':'8px',marginTop:mincel?'-5%': '1%', alignContent:mincel?'center':'left' }}></img>
                                    </div>

                                    <ol style={{ marginTop:mincel? '2%': '2%', marginLeft: mincel?'0':'10%', textAlign:  mincel? 'left':'left'  , color:'white', fontSize:min?'1.8em': '1.3em'}}>
                                        <li >Revisá tu mail</li>
                                        <li >Encontrá el e-ticket que te enviamos</li>
                                        <li >Presentá el código QR en puerta</li>
                                        <li >Entrá y disfrutá</li>
                                    </ol>
                                         <>
                                             <Button  onClick={() => this.setState({ video: true })} style={{paddingTop: mid? '10%' : '5%',marginLeft: 0,  marginTop: vmarginTopB}}>
                                                <img style={{ width:  vbotton, height: 'auto' ,justifyContent: 'center' }} src={verTutorial} alt="Ver Mas" />
                                            </Button>
                                            <Button disabled={disabled} onClick={() => this.envioTicket()} style={{ cursor: disabled? '': 'pointer', paddingTop:'2%', marginTop: vmarginTopB, paddingTop: mid? '10%' : '10%',}}>
                                                <img style={{ width: button2, height:'auto' ,justifyContent: mid? 'left' : 'center' }} src={Ticket} alt="Ver Mas" />
                                        </Button>
                                         {this.state.error &&
                                                        <div style={{  zIndex:20,width: '100%', display: 'flex', justifyContent: 'center' }}>
                                                            <p style={{ marginTop: 20, paddingTop: 20, color: 'red', fontFamily: 'Montserrat-SemiBold', fontSize: 20, margin: 0 }}>{this.state.error}</p>
                                                        </div>
                                                    }
                                        </>
                                </Grid>
                            </Grid>
                               <Grid item sm={12} xs={12} md={6}lg={6} style={{}}>
                            <Grid container direction='column' justifyContent={'center'} alignItems={min ? 'flex-start' : 'center'} >

                                    <Dialog
                                        open={this.state.video}
                                        fullWidth
                                        maxWidth="md"
                                        aria-labelledby="max-width-dialog-title"
                                        onClose={() => this.setState({ video: false})}
                                        PaperProps={{style: {backgroundColor:'transparent'}}}
                                        >
                                        <div style={{ height:500, width:'50%'}}>
                                        <iframe width="200%" height="500" src="https://player.vimeo.com/video/770869737?h=9134719878" title="Vimeo video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                        </div>
                                    </Dialog>
                                </Grid>
                            </Grid>
                            {
                              this.state.showPopup ?
                        <>
                                <div   style={{zIndex: 550, alignItems:'center', alignContent: 'center', borderRadius:10}} >
                                    <Grid container direction='column' alignContent='center' >
                                         <Grid item sm={12} xs={12} md={12} l={12} lg={12}   style={{ }}>
                                    <Box sx={{
                                            borderRadius: 30, height: mincel ? 320 : 300, width: mincel?'90%': '50%', backgroundColor: '#3c026a',
                                            color: '#FFFFFF', padding: min?20: 10, marginTop:mincel?'-88%': '-30%', marginLeft:min?'50%': '5%'
                                                }}>
                                            <Grid container alignItems='center' direction='row' justifyContent='center' style={{marginTop:'10%'}}>
                                                <p className='font-link' className="font-link" style={{zIndex:100, textAlign:'center', fontSize: 24,backgroundColor: '#3c026a', color: '#e42288', lineHeight: 1.2 }}> </p>
                                                <Grid container direction='row' justifyContent='center'  style={{ textAlign:'center',marginTop: 5 , padding:15}}>
                                                    <p className='header' style={{textAlign:'center', fontSize:20, color:'white' }}> Te enviamos tu TICKET a traves de tu MAIL</p>
                                                    <p className='header' style={{textAlign:'center',fontSize: 20, color: 'white' }}> No te olvides de revisar Spam</p>
                                                </Grid>
                                                <Button  src={Ingresar} onClick={() => this.setState({ showPopup: false})} style={{marginTop:'-4%',  padding: 1, cursor: 'pointer'}}>
                                                    <img style={{ padding: mincel? 5 : 10, width: mincel?'60%':'50%', height: mincel? '70%':'70%' ,justifyContent: mid? 'left' : 'center' }} src={cerrar} alt="Ver Mas" />
                                                </Button>

                                            </Grid>
                                        </Box>
                                        </Grid>
                                    </Grid>
                                </div>

                        </>
                    :
                        <>
                        </>
        }
                    </Grid>
                </Grid>
                <Header state='evento'></Header>
            </div>

         </>
        );
    }

}

Evento.propTypes = {
    classes: PropTypes.object.isRequired
};

export default Evento;

