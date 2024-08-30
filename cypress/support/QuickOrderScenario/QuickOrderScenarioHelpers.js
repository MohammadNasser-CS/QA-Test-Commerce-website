import { genrateRandomNumber } from "../utils";
import {
  isProductAlreadyAdded,
  orderdProductsMap,
} from "./QuickOrderScenarioValidation";
import { LOCATOR } from "./selectors";
export const CONSTVALUES = {
  cylinder: "Cylinder",
};
const storeProductDetails = (mfgNumber, quantity) => {
  const productDetails = { mfgNumber, quantity };
  orderdProductsMap.set(mfgNumber, productDetails);
  cy.log(`Stored Mfg Number: ${mfgNumber} with Quantity: ${quantity}`);
};

const addProductToOrder = (qty) => {
  cy.get(LOCATOR.productSelectorQty)
    .should("exist")
    .should("be.visible")
    .clear()
    .should("have.value", "")
    .type(qty)
    .then(() => {
      cy.get(LOCATOR.productSelectorSelectProduct).should("be.enabled").click();
    });
};
const selectAndAddProduct = (products, randomQuantity) => {
  const randomIndex = genrateRandomNumber(0, products.length - 1);
  cy.wrap(products[randomIndex]).within(() => {
    cy.get(LOCATOR.productMFG)
      .invoke("text")
      .then((mfgNumber) => {
        if (isProductAlreadyAdded(mfgNumber)) {
          selectAndAddProduct(products);
        } else {
          storeProductDetails(mfgNumber, randomQuantity);
          cy.wrap(products[randomIndex]).click();
          cy.get(LOCATOR.productSelectorSearchListbox).should("not.exist");
        }
      });
  });
};
export const search = (searchTextValue) => {
  cy.get(LOCATOR.productSelectorSearchInput)
    .should("be.visible")
    .type(searchTextValue, { delay: 100 });
  cy.wait(3000);
};
export const selectRandomProductAndAddToOrder = () => {
  const randomQuantity = genrateRandomNumber(1, 100);
  cy.get(LOCATOR.productSelectorSearchListbox).then((products) => {
    selectAndAddProduct(products, randomQuantity);
  });
  addProductToOrder(randomQuantity);
};
export const addAllProductsToCart = () => {
  cy.get(LOCATOR.quickOrderAddAllProductsToCartButton)
    .should("be.enabled")
    .click();
};
