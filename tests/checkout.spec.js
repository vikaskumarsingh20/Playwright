import { test, expect } from './fixtures/index.js';
import { InventoryPage } from './pages/inventory.page.js';
import { CartPage } from './pages/cart.page.js';
import { CheckoutPage } from './pages/checkout.page.js';

test.describe('Full checkout flow', () => {
  test('Add product to cart and complete purchase', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.verifyProductVisible('Sauce Labs Backpack');
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.openCart();

    const cart = new CartPage(loggedInPage);
    await cart.verifyItemInCart('Sauce Labs Backpack');
    await cart.proceedToCheckout();

    const checkout = new CheckoutPage(loggedInPage);
    await checkout.verifyCheckoutInformationPage();
    await checkout.fillInformation('Vaibhav', 'Patel', '411001');
    await checkout.continueToOverview();

    await checkout.verifyOverviewPage();
    await checkout.verifyProductSummary('Sauce Labs Backpack');
    await checkout.finishOrder();

    await checkout.verifyOrderComplete();
  });
});
