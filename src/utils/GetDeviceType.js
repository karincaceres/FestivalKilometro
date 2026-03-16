export function getDeviceType() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Celulares específicos
  if (width <= 414 && height <= 736) return 'iphone8plus';
  if (width <= 430 && height <= 932) return 'iphonePromax';

  // Mobile general
  if (width <= 375) return 'mobileSmall'; // iPhone SE, 7
  if (width <= 430) return 'mobileMedium'; // iPhone 8+, 15 Pro, 16 Pro Max
  if (width <= 600) return 'mobileLarge'; // Galaxy S Ultra, etc.

  // Laptops
  if (width >= 1200 && width < 1300) return 'laptopHD'; // 1200x600, 1366x768
  if (width >= 1300 && width < 1920) return 'laptopFullHD'; // 1380x750 a 1920x1080
  if (width >= 1920 && width < 2560) return 'laptop2K'; // 1920x1080 a 2560x1440
  if (width >= 2560) return 'laptop4K'; // 4K en adelante

  // Default
  return 'laptopHD';
}
