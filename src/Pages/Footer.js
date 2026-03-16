// Footer.js
import React, { Component } from 'react';
import './Main.css';
import estrellaIG from '../assets/Botones/boton_IG.png'; // 🌟 Imagen con IG
import produceQL from '../assets/Botones/produce.png'; // 🎬 Imagen "Produce Q'loxura"

class Footer extends Component {
  constructor(props) {
    super(props);

    const eventDate = new Date(localStorage.getItem('eventDate'));
    const finEvento = new Date(localStorage.getItem('finevento'));
    const now = new Date();

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      stopped: false,
      eventDay: eventDate,
      finEvento: finEvento,
      diaActual: now,
      evento: false,
    };
  }

  componentDidMount() {
    this.timer();
    this.interval = setInterval(this.timer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer = () => {
    const now = new Date();
    const { eventDay, finEvento } = this.state;

    const secsToStart = Math.floor((eventDay.getTime() - now.getTime()) / 1000);
    const secsToEnd = Math.floor((finEvento.getTime() - now.getTime()) / 1000);

    // 🔹 Evento terminado
    if (secsToEnd <= 0) {
      this.setState({ stopped: true, evento: false, diaActual: now });
      clearInterval(this.interval);
      return;
    }

    // 🔹 Evento en curso
    if (secsToStart <= 0 && secsToEnd > 0) {
      this.setState({ stopped: true, evento: true, diaActual: now });
      return;
    }

    const seconds = secsToStart;
    const days = Math.floor(seconds / 86400);
    const hoursLeft = seconds - days * 86400;
    const hours = Math.floor(hoursLeft / 3600);
    const minutesLeft = hoursLeft - hours * 3600;
    const minutes = Math.floor(minutesLeft / 60);
    const remainingSeconds = seconds % 60;

    this.setState({
      days,
      hours,
      min: minutes,
      sec: parseInt(remainingSeconds, 10),
      diaActual: now,
      evento: false,
      stopped: false,
    });
  };

  BottomBar = ({ children, bottomOffset }) => (
    <div
      style={{
        position: 'fixed',
        left: 0,
        bottom: bottomOffset,
        width: '100%',
        zIndex: 2200,
        padding: '10px 0',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(3px)',
      }}
    >
      {children}
    </div>
  );

  render() {
    const isMobile = window.innerWidth <= 768;
    const bottomOffset = '0';
    const { stopped, evento } = this.state;

    // 🔹 Si el evento ya terminó → “GRACIAS POR VENIR!”
    if (stopped && !evento) {
      return (
        <this.BottomBar bottomOffset={bottomOffset}>
          <div
            className="timeTitle"
            style={{
              width: '100%',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: isMobile ? '1.8em' : '2.5em',
              color: '#FFFFFF',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            ¡GRACIAS POR VENIR!
          </div>
        </this.BottomBar>
      );
    }

    // 🔹 Si el evento está en curso → “¡EMPEZÓ LA FIESTA!”
    if (stopped && evento) {
      return (
        <this.BottomBar bottomOffset={bottomOffset}>
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: isMobile ? '1.8em' : '2.5em',
              color: '#D8DE3E',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            ¡EMPEZÓ LA FIESTA!
          </div>
        </this.BottomBar>
      );
    }

    // 🔹 Footer con contador activo
    return (
      <this.BottomBar bottomOffset={bottomOffset}>
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: isMobile ? 'center' : 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
            width: '100%',
            padding: isMobile ? '5px 0' : '0 2vw',
            height: isMobile ? '25vh' : 'auto', // 👈 1/4 pantalla en mobile
          }}
        >
          {/* 🔹 WEB: estructura horizontal */}
          {!isMobile && (
            <>
              {/* IZQUIERDA: Instagram */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <a
                  href="https://www.instagram.com/qlkfest/?hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                >
                  <img src={estrellaIG} alt="Instagram QLK" style={{ width: '50px', cursor: 'pointer' }} />
                </a>
                <div
                  style={{
                    fontSize: '0.9em',
                    lineHeight: '1.2em',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}
                >
                  Seguí la fiesta, <br />
                  viví la experiencia, <br />
                  seguí <span style={{ color: '#D8DE3E' }}>@QLKFest</span>
                </div>
              </div>

              {/* CENTRO: Contador horizontal */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  textAlign: 'center',
                }}
              >
                <div className="timeTitle" style={{ fontWeight: 'bold', fontSize: '1.8em', color: '#fff' }}>
                  FALTAN
                </div>
                {this.renderTimeBlock('days', 'DÍAS')}
                {this.renderTimeBlock('hours', 'HORAS')}
                {this.renderTimeBlock('min', 'MINUTOS')}
                {this.renderTimeBlock('sec', 'SEGUNDOS')}
              </div>

              {/* DERECHA: Produce Q’loxura */}
              <a
                href="https://www.instagram.com/qlokuraok/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
              >
                <img src={produceQL} alt="Produce Q’loxura" style={{ width: '180px', cursor: 'pointer' }} />
              </a>
            </>
          )}

          {/* 🔹 MOBILE: estructura vertical */}
          {isMobile && (
            <>
              {/* FALTAN + contador */}
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <div className="timeTitle" style={{ fontWeight: 'bold', fontSize: '2em', color: '#fff' }}>
                  FALTAN
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginTop: '5px',
                    flexWrap: 'wrap',
                  }}
                >
                  {this.renderTimeBlock('days', 'DIAS')}
                  {this.renderTimeBlock('hours', 'HORA')}
                  {this.renderTimeBlock('min', 'MINUTOS')}
                  {this.renderTimeBlock('sec', 'SEGUNDOS')}
                </div>
              </div>

              {/* Fila inferior: IG izq + Produce der */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '85%',
                }}
              >
                <a
                  href="https://www.instagram.com/qlkfest/?hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={estrellaIG} alt="Instagram QLK" style={{ width: '45px', cursor: 'pointer' }} />
                </a>

                <a
                  href="https://www.instagram.com/qloxura/?hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={produceQL} alt="Produce Q’loxura" style={{ width: '130px', cursor: 'pointer' }} />
                </a>
              </div>
            </>
          )}
        </div>
      </this.BottomBar>
    );
  }

  renderTimeBlock = (timeUnit, label) => {
    return (
      <div style={{ textAlign: 'center', lineHeight: '1em' }}>
        <div className="timeTitle" style={{ fontSize: '1.6em', fontWeight: 'bold' }}>
          {this.state[timeUnit]}
        </div>
        <div style={{ fontSize: '0.7em', color: '#fff' }}>{label}</div>
      </div>
    );
  };
}

export default Footer;
