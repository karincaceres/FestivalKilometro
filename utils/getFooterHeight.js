// utils/getFooterHeight.js

export function getFooterHeight() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspectRatio = height / width;

  if (width <= 500) {
    if (aspectRatio > 1.8) {
      return '35vh'; // Pantallas Android altas (Motorola, Samsung Ultra)
    } else {
      return '30vh'; // iPhones normales
    }
  } else {
    return '25%'; // Laptops y escritorio
  }
}
