import { expect } from '@playwright/test';

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cartButton = page.locator('.shopping_cart_link');
  }

  async addProductToCart(productName) {
    const button = this.page.locator('.inventory_item', { hasText: productName }).getByRole('button', { name: 'Add to cart' });
    await button.click();
  }

  async openCart() {
    await this.cartButton.click();
  }

  async verifyProductVisible(productName) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }
}
