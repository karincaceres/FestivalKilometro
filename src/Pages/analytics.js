export const trackPageView = (url) => {
  if (window.gtag) {
    window.gtag("config", "G-XTNGCT6FV2", {
      page_path: url,
    });
  }
};
