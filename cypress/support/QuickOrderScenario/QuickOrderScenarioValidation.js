import { LOCATOR } from "./selectors";

export const orderdProductsMap = new Map();
export const isProductAlreadyAdded = (mfgNumber) => {
  return orderdProductsMap.has(mfgNumber);
};
const isProductCorrectlyAdded = (trimmedMfgNumber, quantity) => {
  const product = orderdProductsMap.get(trimmedMfgNumber);
  return product && product.quantity == quantity;
};

const checkIsSameMfgAndQty = (products) => {
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
                throw new Error(
                  `Product with Mfg Number: ${trimmedMfgNumber} is incorrectly added or quantity mismatch.`
                );
              }
            });
        });
    });
  });
};

export const verifyIsCorrectProductIsAddedToCart = () => {
  cy.get(LOCATOR.inCartProductList).then((products) => {
    checkIsSameMfgAndQty(products);
  });
};

export const verifyProdcutOrderedToastSuccessNotificationAppear = () => {
  cy.scrollTo("top");
  cy.get(LOCATOR.toastSuccessNotification).should("exist");
  cy.wait(2000);
};
export const verifyQuickOrderLineIsAppear = () => {
  cy.get(LOCATOR.quickOrderLine).should("exist").should("be.visible");
};
