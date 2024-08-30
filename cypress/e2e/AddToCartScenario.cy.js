import {
  CONSTVALUES,
  search,
  selectRandomProductAndAddToCart,
} from "../support/AddToCartScenario/AddToCartScenarioHelpers";
import {
  verifyAddProdcutToCartIndicators,
  verifyIsCorrectProductIsAddedToCart,
} from "../support/AddToCartScenario/AddToCartScenarioValidation";
import { ROUTES } from "../support/AddToCartScenario/selectors";
import { navigateToUrl } from "../support/utils";

describe("Add To Cart Scenario", () => {
  before(() => {
    navigateToUrl();
    cy.viewport("macbook-16");
  });
  beforeEach(() => {
    cy.intercept("**/**", { log: false }).as("getProducts");
    cy.wait("@getProducts"); // Wait for the API to finish
  });
  it("Search And Add To Cart", () => {
    search(CONSTVALUES.electrical);
    selectRandomProductAndAddToCart();
    verifyAddProdcutToCartIndicators();
    selectRandomProductAndAddToCart();
    verifyAddProdcutToCartIndicators();
    navigateToUrl(ROUTES.cartPage);
    verifyIsCorrectProductIsAddedToCart();
  });
});
