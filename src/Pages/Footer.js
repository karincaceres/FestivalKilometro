import { Component } from "react";
import bocaImg from "../assets/boca.png";
import fondoSeguinos from "../assets/fondo_Seguinos.png";
import logosProducen from "../assets/logos_producen.png";
import seguinosImg from "../assets/seguinos.png";
import "./Main.css";
import igIcon from "../assets/ig.png";
import tiktokIcon from "../assets/tiktok.png";

class Footer extends Component {
  constructor(props) {
    super(props);

    const eventDate = new Date(localStorage.getItem("eventDate"));
    const finEvento = new Date(localStorage.getItem("finevento"));

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      stopped: false,
      evento: false,
      eventDay: eventDate,
      finEvento: finEvento,
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

    if (secsToEnd <= 0) {
      this.setState({ stopped: true, evento: false });
      clearInterval(this.interval);
      return;
    }

    if (secsToStart <= 0 && secsToEnd > 0) {
      this.setState({ stopped: true, evento: true });
      return;
    }

    const days = Math.floor(secsToStart / 86400);
    const hoursLeft = secsToStart - days * 86400;
    const hours = Math.floor(hoursLeft / 3600);
    const minutesLeft = hoursLeft - hours * 3600;
    const min = Math.floor(minutesLeft / 60);
    const sec = secsToStart % 60;

    this.setState({ days, hours, min, sec, stopped: false, evento: false });
  };

  renderTimeBlock(value, label) {
    const isMobile = window.innerWidth <= 768;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: isMobile ? "58px" : "90px",

        }}
      >
        <div
          style={{
            fontFamily: "MonumentExtended-Ultrabold",
            fontSize: isMobile ? "1.7em" : "2.6em",
            color: "#fff",
            lineHeight: 0.9,
            textAlign: "center",
          }}
        >
          {String(value).padStart(2, "0")}
        </div>

        <div
          style={{
            fontFamily: "FuturaBkBTBook1",
            fontSize: isMobile ? "0.62em" : "0.95em",
            color: "#fff",
            marginTop: isMobile ? "2px" : "4px",
            textAlign: "center",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </div>
      </div>
    );
  }

  renderSocialBlock(isMobile) {

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? "20px" : "12px",
		  width: "100%",
		  marginTop:'-10px',
        }}
      >
        <img
          src={bocaImg}
          alt="boca"
          style={{
            height: isMobile ? "44px" : "86px",
            objectFit: "contain",
            flexShrink: 0,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: isMobile ? "285px" : "320px",
              maxWidth: "100%",
              pointerEvents: "auto",
            }}
          >
            <img
              src={fondoSeguinos}
              alt="redes"
              style={{
                width: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />

            <a
              href="https://www.instagram.com/festivalkilometro"
              target="_blank"
              rel="noreferrer"
              style={{
                position: "absolute",
                left: isMobile ? "16px" : "34px",
                top: isMobile ? "13px" : "22px",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                pointerEvents: "auto",
              }}
            >
              <img
                src={igIcon}
                alt="Instagram"
                style={{
                  width: isMobile ? "120px" : "130px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </a>

            <a
              href="https://www.tiktok.com/@festival.km"
              target="_blank"
              rel="noreferrer"
              style={{
                position: "absolute",
                left: isMobile ? "145px" : "180px",
                top: isMobile ? "13px" : "18px",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                pointerEvents: "auto",
              }}
            >
              <img
                src={tiktokIcon}
                alt="TikTok"
                style={{
                  width: isMobile ? "120px" : "120px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </a>
          </div>

          <img
            src={seguinosImg}
            alt="seguinos"
            style={{
              marginTop: isMobile ? "1px" : "-4px",
              width: isMobile ? "82px" : "130px",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      </div>
    );
  }

	renderDesktopFooter(days, hours, min, sec) {

    return (
      <>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 34px 10px 34px",
            boxSizing: "border-box",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: "33%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "12px",
            }}
          >
            {this.renderSocialBlock(false)}
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontFamily: "Blogh",
                fontSize:  "3.2em",
                color: "#fff",
                whiteSpace: "nowrap",
                lineHeight: 1,
                marginRight: "-20px",
              }}
            >
              FALTAN
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: "16px",
				flexWrap: "nowrap",
				marginTop:'20px'
              }}
            >
              {this.renderTimeBlock(days, "DÍAS")}
              {this.renderTimeBlock(hours, "HORAS")}
              {this.renderTimeBlock(min, "MINUTOS")}
              {this.renderTimeBlock(sec, "SEGUNDOS")}
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "14px",
            boxSizing: "border-box",
          }}
        >
          <img
            src={logosProducen}
            alt="acompañan"
            style={{
              height: "50px",
              width: "auto",
              maxWidth: "70%",
              objectFit: "contain",
            }}
          />
        </div>
      </>
    );
  }

  renderMobileFooter(days, hours, min, sec) {
    return (
      <>
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "6px 10px 0 10px",
            boxSizing: "border-box",
            gap: "3px",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* 1. boca + redes */}
          {this.renderSocialBlock(true)}

          {/* 2. faltan */}
          <div
            style={{
              fontFamily: "Blogh",
              fontSize: "2.35em",
              color: "#fff",
              lineHeight: 1,
              textAlign: "center",
              marginTop: "0px",
            }}
          >
            FALTAN
          </div>

          {/* 3. números */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "2px",
              flexWrap: "nowrap",
              width: "100%",
            }}
          >
            {this.renderTimeBlock(days, "DÍAS")}
            {this.renderTimeBlock(hours, "HORAS")}
            {this.renderTimeBlock(min, "MINUTOS")}
            {this.renderTimeBlock(sec, "SEGUNDOS")}
          </div>
        </div>

        {/* 4. logos abajo */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "10px",
            boxSizing: "border-box",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            src={logosProducen}
            alt="acompañan"
            style={{
              height: "30px",
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </>
    );
  }

  render() {
    const isMobile = window.innerWidth <= 768;
    const { stopped, evento, days, hours, min, sec } = this.state;

    const footerHeight = isMobile ? 185 : 175;

    const containerStyle = {
      position: "fixed",
      left: 0,
      bottom: 0,
      width: "100%",
      height: `${footerHeight}px`,
      zIndex: 50,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "transparent",
      pointerEvents: "none",
    };

    if (stopped && !evento) {
      return (
        <div style={containerStyle}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Blogh",
              fontSize: isMobile ? "1.7em" : "2.5em",
              color: "#fff",
            }}
          >
            ¡GRACIAS POR VENIR!
          </div>
        </div>
      );
    }

    if (stopped && evento) {
      return (
        <div style={containerStyle}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Blogh",
              fontSize: isMobile ? "1.5em" : "2.5em",
              color: "#fff",
            }}
          >
            ¡EMPEZÓ LA FIESTA!
          </div>
        </div>
      );
    }

    return (
      <div style={containerStyle}>
        {isMobile
          ? this.renderMobileFooter(days, hours, min, sec)
          : this.renderDesktopFooter(days, hours, min, sec)}
      </div>
    );
  }
}

export default Footer;
