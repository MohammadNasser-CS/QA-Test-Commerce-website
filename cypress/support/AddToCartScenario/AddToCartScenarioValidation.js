import { LOCATOR } from "./selectors";

export const selectedProductsMap = new Map();
// Function to check if a product is already in the cart
export const isProductAlreadyAdded = (mfgNumber) => {
  return selectedProductsMap.has(mfgNumber);
};
// Function to check if a product is correctly added to the cart
const isProductCorrectlyAdded = (trimmedMfgNumber, quantity) => {
  const product = selectedProductsMap.get(trimmedMfgNumber);
  return product && product.quantity == quantity;
};

// Function to verify if the MFG number and quantity are the same
const checkIsSameMfgAndQty = (products) => {
  // Convert products to an array if it's not already one
  const productArray = Array.isArray(products)
    ? products
    : Array.from(products);
  productArray.forEach((product) => {
    cy.wrap(product).within(() => {
      cy.get(LOCATOR.productMFG)
        .invoke("text")
        .then((mfgNumber) => {
          const trimmedMfgNumber = mfgNumber.trim();
          cy.get(LOCATOR.inCartquantityInput)
            .invoke("val")
            .then((quantity) => {
              if (!isProductCorrectlyAdded(trimmedMfgNumber, quantity)) {
                // fail the test if the product is not correctly added
                throw new Error(
                  `Product with Mfg Number: ${trimmedMfgNumber} is incorrectly added or quantity mismatch.`
                );
              }
            });
        });
    });
  });
};

// Function to verify if products in the cart match the expected ones
export const verifyIsCorrectProductIsAddedToCart = () => {
  cy.get(LOCATOR.inCartProductList).then((products) => {
    checkIsSameMfgAndQty(products);
  });
};

export const verifyAddProdcutToCartIndicators = () => {
  // Scroll to the top of the page
  cy.scrollTo("top");
  // Check if the toast success notification element exists
  cy.get(LOCATOR.toastSuccessNotification).should("exist"); // Ensure the element exists
  cy.get(LOCATOR.miniCartItemsNumber)
    .should("exist") // Ensure the element exists
    .invoke("text") // Get the inner text of the element
    .then((miniCartItemsNumber) => {
      // Verify the inner text matches the expected value
      cy.wrap(miniCartItemsNumber.trim()).should(
        "eq",
        `${selectedProductsMap.size} Items`
      );
    });
  cy.wait(2000); // Wait for page loaded fully.
};
