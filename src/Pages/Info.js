import React, {useEffect, useMemo, useState} from 'react';
import './Main.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import Background from '../assets/Fondos/fondo1.png';
import MapaImg from '../assets/info/Info_image00.png';

// Páginas del carrusel
const pageNames = ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png', '07.png', '08.png', '09.png'];
const loadPage = name => require(`../assets/info/${name}`);

const Info = () => {
  const [vw, setVw] = useState(window.innerWidth);
  const isMobile = vw < 768;

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Centro el bloque y calculo un ancho máximo cómodo
  const maxContainer = Math.min(1000, vw * 0.92); // ancho máx del “stage”
  const gap = 10; // separación entre columnas en desktop
  // Cada “tarjeta” (imagen) ocupa 1/3 del ancho visible (3 imágenes simultáneas)
  const cardWidth = isMobile ? undefined : (maxContainer - 2 * gap) / 3;

  const images = useMemo(() => pageNames.map(loadPage), []);
  const chunkSize = isMobile ? 1 : 2; // mobile: 1 por slide, web: 2 por slide
  const slides = [];
  for (let i = 0; i < images.length; i += chunkSize) {
    slides.push(images.slice(i, i + chunkSize));
  }

  const pageStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const containerStyle = {
    width: isMobile ? '100%' : `${maxContainer}px`,
    margin: '0 auto',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isMobile ? 16 : gap,
    padding: isMobile ? '24px 16px' : '48px 0',
    boxSizing: 'border-box',
  };

  // Columna izquierda: 1 imagen (misma “tarjeta” que las del carrusel)
  const leftImgStyle = {
    width: isMobile ? '85%' : `${cardWidth}px`,
    height: 'auto',
    objectFit: 'contain',
    cursor: 'pointer',
    borderRadius: 8,
    display: 'block',
  };

  // Carrusel (cada slide contiene 2 tarjetas en web, 1 en mobile)
  const slideRowStyle = {
    display: 'flex',
    justifyContent: isMobile ? 'center' : 'flex-start',
    alignItems: 'center',
    gap: isMobile ? 0 : gap,
  };

  const slideImgStyle = {
    width: isMobile ? '85vw' : `${cardWidth}px`,
    maxWidth: isMobile ? '85%' : `${cardWidth}px`,
    height: 'auto',
    objectFit: 'contain',
    borderRadius: 8,
    display: 'block',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* Tarjeta fija (izquierda) */}
        <img src={MapaImg} alt="Ubicación del evento" style={leftImgStyle} onClick={() => window.open('https://maps.app.goo.gl/J6ywBWRqd6qtVGJ76')} />

        {/* Carrusel (derecha) */}
        <div style={{width: isMobile ? '100%' : `${cardWidth * 2 + gap}px`}}>
          <Carousel className="custom-carousel info-carousel" controls={slides.length > 1} indicators={slides.length > 1} interval={slides.length > 1 ? 4000 : null} pause="hover">
            {slides.map((group, idx) => (
              <Carousel.Item key={idx}>
                <div style={slideRowStyle}>
                  {group.map((src, j) => (
                    <img key={j} src={src} alt={`Página ${idx * chunkSize + j + 1}`} style={slideImgStyle} />
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Info;
