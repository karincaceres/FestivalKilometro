import React from 'react';
//import back from '../assets/Fondos/FONDO.jpg';

import Loader from 'react-loader-spinner';

import enviar from '../assets/Botones/enviar-01.png';
//import { Cookies } from 'react-cookie';
import Background from '../assets/Fondos/fondo1.png';
//const cookies = new Cookies();
//const dniValue = cookies.get("dni");
import './Main.css';

class Consultas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      loading: false,
      error: '',
      colorerror: 'green',
    };
  }

  handleInputChange = e => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  sendComment = async () => {
    this.setState({loading: true});
    if (this.state.name === '' || this.state.message === '') {
      return;
    }

    const body = {
      email: localStorage.email,
      name: this.state.name,
      comment: this.state.message,
      dni: localStorage.dni,
    };
    // console.log("acac body", body);

    // eslint-disable-next-line
    var response = await fetch('https://mocaub1h8d.execute-api.us-east-1.amazonaws.com/prod/commentsQR', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        //console.log("Respuesta de la API:", response); // Registra la respuesta de la API
        if (response.status === 200) {
          this.setState({
            error: 'Consulta enviada con Éxito!',
            colorerror: 'green',
            loading: false,
            name: '',
            comment: '',
          });
        } else {
          this.setState({error: response.error, loading: false});
          return response.json();
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  render() {
    const isMobile = window.innerWidth <= 500;

    const mid = window.innerWidth > 1000 && window.innerWidth < 1400;
    // const widthScreen = window.innerWidth >= 790;
    const mincel = window.innerWidth <= 500;
    //  const headerSize = parseFloat(localStorage.getItem('headerSize'));
    // const marginBottom = mincel ? "200px" : "0";
    const containerStyle = {
      height: '100vh',
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
      margin: 0,
      top: 0,
      width: '100vw',
      border: 'none',
      maxWidth: '100%',
      bottom: 0,
      display: 'flex',
      zIndex: 1,
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    };

    return (
      <div style={containerStyle}>
        <div className="concepto-content">
          <div className="left-column" style={{width: mincel ? '100vw' : '50%', justifyContent: 'center', alignContent: 'center', textAlign: 'center'}}>
            <div style={{display: 'flex', alignItems: mincel ? 'center' : 'flex-end', flexDirection: 'column'}}>
              <p className="title">ESTAMOS TRABAJANDO PARA UN LANZAMIENTO ÚNICO</p>
              {/* <p className="textpage" style={{ marginLeft: mincel ? "20px" : "10%", textAlign: mincel ? "center" : "right", alignSelf: "left", fontWeight: "bold", marginTop: mincel? '2px':"5%", fontSize: max ? "1.2em" : mincel ? "1em" : "1em" }}>Ante cualquier consulta que tengas, escribinos y te asesoramos!</p> */}
              <div
                style={{
                  width: '300px',
                  marginTop: '-30px',
                  borderBottom: '4px solid #13A538', // Estilo del underline
                }}></div>
            </div>
          </div>
          {this.state.loading && (
            <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
              <Loader type="TailSpin" color="#13A538" height={80} width={80} />
            </div>
          )}
          <div className="right-column" style={{width: mincel ? '90vw' : '50%', justifyContent: mincel ? 'center' : 'center', alignContent: mincel ? 'center' : 'center', textAlign: mincel ? 'center' : 'left', alignItems: mincel ? 'center' : 'left'}}>
            <div style={{marginTop: mincel ? '30px' : '0vh', fontSize: mid ? '1em' : '1.2em', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'left', width: isMobile ? '90vw' : mid ? '80%' : '90%'}}>
              <label style={{fontSize: mid ? '1em' : '1em', textAlign: 'left', alignSelf: 'left'}}>NOMBRE Y APELLIDO</label>
              <input name="name" label="Nombre y Apellido" variant="outlined" style={{fontSize: mid ? '1em' : '1.2em', backgroundColor: 'white', marginTop: '1%', height: '40px'}} onChange={this.handleInputChange} />
              {/* <label style={{ fontSize: mid ? "1em" : "1em", textAlign: "left", alignSelf: "left" }}>EMAIL</label>
							<input name="email" label="Email" variant="outlined" style={{ fontSize: mid ? "1em" : "1.2em", backgroundColor: "white", marginTop: "1%", height: "40px" }} onChange={this.handleInputChange} /> */}
              <label style={{fontSize: mid ? '1em' : '1em', textAlign: 'left', alignSelf: 'left'}}>CONSULTA</label>
              <input name="message" label="Consulta" variant="outlined" style={{fontSize: mid ? '1em' : '1.2em', backgroundColor: 'white', marginTop: '1%', height: '80px'}} multiline="true" onChange={this.handleInputChange} />
              <div>
                <button style={{textAlign: isMobile ? 'center' : 'left', alignSelf: 'left', border: 'none', backgroundColor: 'transparent', marginTop: '2%'}} onClick={() => this.sendComment()}>
                  <img src={enviar} style={{width: isMobile ? '70%' : mid ? '70%' : '70%'}} alt="Botón 1" />
                </button>
              </div>
            </div>

            {this.state.error && (
              <div style={{width: '300px', display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: this.state.colorerror, color: '#000000', padding: '20px', borderRadius: '10px', textAlign: 'center', zIndex: 999}}>
                <div style={{position: 'absolute', top: '-15px', right: '-15px', cursor: 'pointer', backgroundColor: '#FFFFFF', fontSize: '24px', width: '36px', height: '36px', borderRadius: '50%', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => this.setState({error: false})}>
                  X
                </div>
                <p style={{fontSize: '1.5em', borderRadius: 2, margin: 10, marginTop: 20, color: 'white', fontFamily: 'Montserrat-SemiBold'}}>{this.state.error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Consultas;
