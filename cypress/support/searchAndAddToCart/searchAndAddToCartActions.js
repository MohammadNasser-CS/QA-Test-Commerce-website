import { LOCATOR } from "../selectors";
import { selectAndAddProduct } from "./searchAndAddToCartHelpers";

export const search = (searchTextValue) => {
  cy.getDataTest(LOCATOR.headerSearchInputTextField)
    .should("be.visible")
    .type(searchTextValue);
  cy.get(LOCATOR.headerSearchButton).should("be.visible").click();
};

export const selectRandomProductAndAddToCart = () => {
  cy.get(LOCATOR.productsList).then((products) => {
    selectAndAddProduct(products);
  });
};
