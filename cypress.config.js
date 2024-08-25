const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:"https://mcmc-mcrey.commerce.insitesandbox.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "**/*.cy.js", // Adjust the pattern according to your file naming convention
  },
});
