export const genrateRandomNumber = (minBound, maxBound) => {
  return Math.floor(Math.random() * (maxBound - minBound)) + minBound;
};
export const navigateToUrl = (path = "") => {
  return cy.visit(`/${path}`);
};
