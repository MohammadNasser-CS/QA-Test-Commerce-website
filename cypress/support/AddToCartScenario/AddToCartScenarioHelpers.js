import {
  isProductAlreadyAdded,
  selectedProductsMap,
} from "./AddToCartScenarioValidation";
import { genrateRandomNumber } from "../utils";
import { LOCATOR } from "./selectors";
export const CONSTVALUES = {
  electrical: "Electrical",
};
export const search = (searchTextValue) => {
  cy.getDataTest(LOCATOR.headerSearchInputTextField)
    .should("be.visible")
    .type(searchTextValue);
  cy.get(LOCATOR.headerSearchButton).should("be.visible").click();
  cy.wait(5000); // Wait for page loaded fully.
};

// function to store product details in the map
const storeProductDetails = (mfgNumber, quantity) => {
  const productDetails = { mfgNumber, quantity };
  selectedProductsMap.set(mfgNumber, productDetails);
  cy.log(`Stored Mfg Number: ${mfgNumber} with Quantity: ${quantity}`);
};

// function to interact with the product's quantity input and add to cart
export const addProductToCart = (quantity) => {
  cy.get(LOCATOR.quantityInput)
    .should("exist") // Ensure the element exists in the DOM
    .should("be.visible") // Ensure the element is visible
    .clear()
    .should("have.value", "")
    .type(quantity)
    .then(() => {
      cy.get(LOCATOR.addToCartButton).should("be.visible").click();
    });
};

// Recursive function to select and add a random product
const selectAndAddProduct = (products) => {
  cy.intercept("**/**", { log: false }).as("getProducts");
  cy.wait("@getProducts"); // Wait for the API to finish
  const randomIndex = genrateRandomNumber(0, products.length - 1);
  const randomQuantity = genrateRandomNumber(1, 100);
  cy.wrap(products[randomIndex]).within(() => {
    cy.get(LOCATOR.productMFG)
      .invoke("text")
      .then((mfgNumber) => {
        const trimmedMfgNumber = mfgNumber.trim();
        if (isProductAlreadyAdded(trimmedMfgNumber)) {
          // If the product is already added, select another product
          selectAndAddProduct(products);
        } else {
          // Store the product details and add to cart
          storeProductDetails(trimmedMfgNumber, randomQuantity);
          addProductToCart(randomQuantity);
        }
      });
  });
};
export const selectRandomProductAndAddToCart = () => {
  cy.get(LOCATOR.productsList).then((products) => {
    selectAndAddProduct(products);
  });
};
