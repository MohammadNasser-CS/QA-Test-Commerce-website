export const genrateRandomNumber = (minBound, maxBound) => {
  return Math.floor(Math.random() * (maxBound - minBound)) + minBound;
};
export const navigateToUrl = (path = "") => {
   cy.visit(`${path}`);
   cy.wait(5000); // Wait for page loaded fully.
};
