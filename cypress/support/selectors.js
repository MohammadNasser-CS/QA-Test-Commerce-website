export const LOCATOR = {
  headerSearchInputTextField: "headerSearchInputTextField",
  headerSearchButton: '#header-wrapper label[id^="headerSearch"] ~ button',
  productsList:
    '[data-test-selector="productListCards_undefined"] [data-test-selector^="productListProductCard"]',
  quantityInput: '[data-test-selector="product_qtyOrdered"]',
  addToCartButton: '[data-test-selector^="actionsAddToCart"]',
  productMFG: '[data-test-selector="manufacturerItem"]',
  inCartProductList: '[data-test-selector^="cartline_expanded_"]',
  inCartquantityInput: '[data-test-selector="cartline_qty"]',
  miniCartItemsNumber: '[data-test-selector="cartLinkQuantity"]',
  toastSuccessNotification: '[data-test-selector="toastsuccess"]',
};
