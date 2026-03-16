import React from "react";
//import {Grid, Box} from '@material-ui/core';
//import './Main.css'
//import logoCargando from '../assets/Barracargando_Web.png'
//import logoCargandoR from '../assets/Barracargando_Web.png'
//import Background from '../assets/fondo_web.jpg'
//import BackgroundR from '../assets/fondo_mobile.jpg'
//import logofooter1 from '../assets/logo_marquez.png'
//import logofooter2 from '../assets/logo_cabure.png'
//import logo from '../assets/Logo.png'
//import savethedate from '../assets/Savethedate_web.png'
//import savethedateR from '../assets/Savethedate_mobile.png'



class ProntoWeb extends React.Component {
    //constructor(props) {
    //    super(props);
    //    // we use this to make the card to appear after the page has been rendered
    //    this.state = {
    //        mensaje:''
    //    };
    //}

    //render() {
    //    const min = window.innerWidth >= 1000
    //    const height = window.innerHeight
    //    const width = window.innerWidth
    //    const minheight = window.innerHeight >= 1400
    //    const minWidth = window.innerWidth >= 1400
    //    const mincel = window.innerWidth >= 500


    //        return (
    //         <div>
    //                <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
    //                    <div style={{ width: '100%', backgroundImage: min? `url(${Background})`: `url(${BackgroundR})`, backgroundSize: 'cover' }}>
    //                        <Grid item xs={12} sm={12} style={{ display:'flex',flexDirection: 'column',alignContent:'center' }}>
    //                            {min ?
    //                                <>
    //                                    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
    //                                        <img style={{ height: 'auto', maxWidth: minheight ? 700 : 500, marginTop: '1%', alignItems: 'center' }} src={logo}></img>
    //                                        <img style={{width: minheight?'350px': '250px', marginTop: '2%', paddingLeft:30 }} src={savethedate}></img>
    //                                    </div>
    //                                    <div  style={{display: 'flex',justifyContent:'center', alignContent:'center', marginTop: minheight?'5%':0}}>
    //                                        <Box  sx={{  padding:minheight? 25: 10, borderRadius:30, height:minheight?'300px': '270px', width: minheight ? '800px' : '700px',  backgroundColor: '#FFFFFF20',
    //                                                color: '#FFFFFF'
    //                                            }}>
    //                                            <p className="font-link" style={{ color: '#e42288', marginTop: 10, fontSize: minheight?'45px': '40px',letterSpacing:'4.5px' }}>MUCHAS GRACIAS</p>
    //                                            <p className="font-link" style={{ color:'#e42288', marginTop: 30, fontSize: minheight?'45px': '40px',letterSpacing:'4.5px' , lineHeight:'1.2px'}}>POR INICIAR SESIÓN</p>
    //                                            <div  style={{display: 'flex',justifyContent:'center', alignContent:'center', marginTop: minheight?'5%':'5%'}}>
    //                                                <Box   sx={{  padding: minheight?25:5,  height: 'auto', width: minheight ? '680px' : '400px', border: 'solid'}}>
    //                                                    <p className="timeValueLabel" style={{ marginTop: 20, fontSize: minheight ? '32px' : '20px' , lineHeight:'1.2px'}}>Muy pronto vas a enterarte de todo</p>
    //                                                    <p className="timeValueLabel" style={{ marginTop: 30, fontSize: minheight ? '32px' : '20px' , lineHeight:'1.2px'}}>lo que tenemos preparado para vos...</p>

    //                                                </Box>
    //                                            </div>
    //                                        </Box>
    //                                    </div>
    //                                    <Grid container alignItems='center' direction='row' justifyContent='center' style={{  width: '100%' }}>
    //                                        <span style={{alignContent:'center', position:'absolute',bottom:0}}>
    //                                                <img style={{ width: 150, height: 'auto',  alignItems: 'center', bottom: 0}} src={logofooter1}></img>
    //                                                <img  style={{ width: 200, height:'auto', alignItems: 'center' , bottom: 0 }} src={logofooter2}></img>
    //                                        </span>
    //                                        </Grid>
    //                                </>
    //                            :

    //                                <>
    //                                    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
    //                                        <img style={{ maxWidth: 280, marginTop: '10%', alignItems: 'center', padding: 2 }} src={logo}></img>
    //                                    </div>

    //                                      <div  style={{display: 'flex',justifyContent:'center', alignContent:'center'}}>
    //                                    <Box  sx={{  padding: 5, borderRadius:30, height:min?'auto':'300px', width: mincel ? '250px' : '400px',  backgroundColor: '#FFFFFF20',
    //                                                color: '#FFFFFF'
    //                                            }}>
    //                                            <p className="font-link" style={{ color: '#e42288', marginTop: 10, fontSize: '30px',letterSpacing:'2.1px' }}>MUCHAS GRACIAS</p>
    //                                            <p className="font-link" style={{ color:'#e42288', marginTop: 30, fontSize: '30px',letterSpacing:'3.1px' , lineHeight:'1.2px'}}>POR INICIAR SESIÓN</p>
    //                                            <div  style={{display: 'flex',justifyContent:'center', alignContent:'center', marginTop: min?'5%':'10%'}}>
    //                                                <Box   sx={{  padding: 15,  height: 'auto', width: mincel ? '280px' : '320px', border: 'solid'}}>
    //                                                    <p className="timeValueLabel" style={{ marginTop: 2, fontSize: min ? '32px' : '20px', lineHeight:'2px' }}>Muy pronto vas a enterarte </p>
    //                                                    <p className="timeValueLabel" style={{ marginTop: 20, fontSize: min ? '32px' : '20px', lineHeight: '2px' }}>de todo lo que tenemos</p>
    //                                                    <p className="timeValueLabel" style={{ marginTop: 20, fontSize: min ? '32px' : '20px', lineHeight: '2px' }}>preparado para vos...</p>
    //                                                </Box>
    //                                            </div>
    //                                        </Box>

    //                                    </div>
    //                                     <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
    //                                        <img style={{ maxWidth: mincel? 100: 120,  alignItems: 'center', marginTop:20 }} src={savethedate}></img>
    //                                    </div>
    //                                    <Grid container alignItems='center' direction='row' justifyContent='center' style={{  width: '100%' }}>
    //                                        <span style={{alignContent:'center', position:'absolute',bottom:0}}>
    //                                                <img style={{ width: 150, height: 'auto',  alignItems: 'center', bottom: 0}} src={logofooter1}></img>
    //                                                <img  style={{ width: 200, height:'auto', alignItems: 'center' , bottom: 0 }} src={logofooter2}></img>
    //                                        </span>
    //                                    </Grid>
    //                                </>}

    //                       </Grid>
    //                    </div>
    //                    </div>
    //            </div>

    //        );


    //}



        }

export default ProntoWeb;
