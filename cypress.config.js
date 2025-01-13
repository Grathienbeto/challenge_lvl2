const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportFilename: "[status]_[datetime]-[name]-report",
    html: true
  },
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
    
    /*setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },*/
  },
});

// npx mocha --spec cypress/e2e/HappyPath/HappyPath.spec.js --reporter mochawesome