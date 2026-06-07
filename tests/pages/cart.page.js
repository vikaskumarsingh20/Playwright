import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async verifyItemInCart(productName) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
