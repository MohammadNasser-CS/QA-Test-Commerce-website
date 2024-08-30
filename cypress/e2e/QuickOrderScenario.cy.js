import {
  addAllProductsToCart,
  CONSTVALUES,
  search,
  selectRandomProductAndAddToOrder,
} from "../support/QuickOrderScenario/QuickOrderScenarioHelpers";
import {
  verifyIsCorrectProductIsAddedToCart,
  verifyProdcutOrderedToastSuccessNotificationAppear,
  verifyQuickOrderLineIsAppear,
} from "../support/QuickOrderScenario/QuickOrderScenarioValidation";
import { ROUTES } from "../support/QuickOrderScenario/selectors";
import { navigateToUrl } from "../support/utils";

describe("Quick Order Scenario", () => {
  before(() => {
    navigateToUrl(ROUTES.quickOrder);
    cy.viewport("macbook-16");
  });
  it("search and order product", () => {
    search(CONSTVALUES.cylinder);
    selectRandomProductAndAddToOrder();
    verifyProdcutOrderedToastSuccessNotificationAppear();
    verifyQuickOrderLineIsAppear();
    addAllProductsToCart();
    verifyProdcutOrderedToastSuccessNotificationAppear();
    verifyIsCorrectProductIsAddedToCart();
  });
});
