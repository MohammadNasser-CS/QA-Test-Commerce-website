export const LOCATOR = {
  productSelectorSearchInput:
    '[data-test-selector="productSelector_search-input"]',
  productSelectorQty: '[data-test-selector="productSelector_qty"]',
  productMFG: '[data-test-selector="manufacturerItem"]',
  productSelectorSelectProduct:
    '[data-test-selector="productSelector_selectProduct"]',
  productSelectorSearchListbox:
    '[data-test-selector="productSelector_search-listbox"] > div',
  toastSuccessNotification: '[data-test-selector="toastsuccess"]',
  quickOrderLine: '[data-test-selector="productSelector"] ~div',
  quickOrderAddAllProductsToCartButton:
    '[data-test-selector="quickOrder_addAllProductsToCart"]',
  inCartProductList: '[data-test-selector^="cartline_expanded_"]',
  inCartquantityInput: '[data-test-selector="cartline_qty"]',
  miniCartItemsNumber: '[data-test-selector="cartLinkQuantity"]',
};
export const ROUTES = {
  homePage: "",
  quickOrder: "/QuickOrder",
};
