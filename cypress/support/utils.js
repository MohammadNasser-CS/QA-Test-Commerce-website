export const genrateRandomNumber = (minBound, maxBound) => {
  return Math.floor(Math.random() * (maxBound - minBound)) + minBound;
};
export const navigateToUrl = (path = "") => {
  cy.visit(`${path}`);
  cy.intercept("**/**", { log: false });
  cy.wait(3000); // Wait for the API to finish
};
