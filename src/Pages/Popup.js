import React from 'react';
import './Main.css';


import Ingresar from '../assets/ingresar.png'

import {Button, Grid, Box } from '@material-ui/core';

class Popup extends React.Component {
    render() {
   const min = window.innerWidth >= 1000
        return (
        <div className='popup' style={{width: min? '':'100%', height: min? '':'50%', alignContent: 'center', borderRadius:10}} >
                <div className='popup_open'style={{marginTop: min? '' : '-4%', left: min?'': '0', width: min? '' :'100%', height: min? '': '40%', borderRadius:10}}>
                     <button onClick={this.props.closePopup}>X</button>
                    <h1 style={{ alignContent: 'center' }} >{this.props.text}
                        <Box color="white" bgcolor='#3c026a' sx={{ borderRadius:12, textAlign: 'center', fontFamily: 'Verdana' , fontSize: '30px', height: '400px',  width: '800px' }}>
                            <Grid container alignItems='center' direction='column' justifyContent='center' style={{  width: '100%', padding:20,backgroundColor: '#3c026a' }}>
                                <p className='font-link' style={{ marginTop: min? '10%': 5,textAlign:'center', fontSize: 30,backgroundColor: '#3c026a', color: '#e42288', lineHeight: 1.2 }}> REGISTRÁ TU MAIL PARA RECIBIR TU TICKET</p>
                                    <input
                                                    style={{
                                                        borderRadius: 5,  borderWidth: 1, borderStyle: 'solid',
                                                        width: '90%',
                                                        height: '40px', padding: 5
                                                    }}
                                                    type='email'
                                                    required
                                                    placeholder={'ej.: ejemplo@gmail.com'}
                                                    onChange={(event) => this.setState({ send: false, email: event.target.value })}
                                                >
                                    </input>
                                        <Button  src={Ingresar} onClick={() => this.login()} style={{  padding: 40, cursor: 'pointer'}}>
                                            <img alt='imagen' width='180px' height='auto' src={Ingresar} ></img>
                                        </Button>
                        </Grid>
                        </Box>

                        {/*<img src={pass} style={{width: '100%', height: '100%'}}></img>*/}
                    </h1>

        </div>
        </div>
        );
}
}
export default Popup;
