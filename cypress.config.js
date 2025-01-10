const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Configurar ancho y alto de pantalla
  viewportHeight: 1080,
  viewportWidth: 1920,

  // variables de entorno
  env: {
    baseUrl: "https://automationexercise.com",
    apiUrl: "https://automationexercise.com/api"
  },

  // para establecer los nombres de los archivos (.spec.js)
  e2e: {
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {},
  },
});
