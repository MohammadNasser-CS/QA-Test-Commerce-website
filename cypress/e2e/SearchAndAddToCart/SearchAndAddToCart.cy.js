import * as SearchAndAddToCartHelpers from "../../support/searchAndAddToCart/searchAndAddToCartActions";
import {
  verifyAddProdcutToCartIndicators,
  verifyIsCorrectProductIsAddedToCart,
} from "../../support/searchAndAddToCart/searchAndAddToCartValidation";
import { navigateToUrl } from "../../support/utils";
export const CONSTVALUES = {
  electrical: "Electrical",
};
describe("SearchAndAddToCart", () => {
  before(() => {
    navigateToUrl();
    cy.viewport("macbook-16");
  });
  beforeEach(() => {
    cy.intercept("**/*", { log: false });
    cy.wait(5000); // Wait for page loaded fully.
  });
  it("Search And Add To Cart", () => {
    SearchAndAddToCartHelpers.search(CONSTVALUES.electrical);
    cy.wait(5000); // Wait for page loaded fully.
    SearchAndAddToCartHelpers.selectRandomProductAndAddToCart();
    verifyAddProdcutToCartIndicators();
    cy.wait(5000); // Wait for page loaded fully.
    SearchAndAddToCartHelpers.selectRandomProductAndAddToCart();
    verifyAddProdcutToCartIndicators();
    navigateToUrl("Cart");
    cy.wait(5000); // Wait for page loaded fully.
    verifyIsCorrectProductIsAddedToCart();
  });
});
