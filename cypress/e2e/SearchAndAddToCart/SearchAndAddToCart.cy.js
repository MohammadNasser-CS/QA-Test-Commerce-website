import {
  search,
  selectRandomProductAndAddToCart,
} from "../../support/searchAndAddToCart/searchAndAddToCartHelpers";
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
    cy.intercept("**/**", { log: false });
  });
  it("Search And Add To Cart", () => {
    search(CONSTVALUES.electrical);
    selectRandomProductAndAddToCart();
    verifyAddProdcutToCartIndicators();
    selectRandomProductAndAddToCart();
    verifyAddProdcutToCartIndicators();
    navigateToUrl("Cart");
    verifyIsCorrectProductIsAddedToCart();
  });
});
