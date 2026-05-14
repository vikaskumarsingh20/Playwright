import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './auth.helper.js';

const PRODUCTS = [
  {
    id: 'add-to-cart-sauce-labs-backpack',
    name: 'Sauce Labs Backpack',
  },
  {
    id: 'add-to-cart-sauce-labs-bike-light',
    name: 'Sauce Labs Bike Light',
  },
];

test.describe('Product page - Add to cart workflow', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('TC004 - Add two products using their button ids and verify cart count', async ({ page }) => {
    for (const product of PRODUCTS) {
      await page.click(`#${product.id}`);
    }

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(2);

    for (const product of PRODUCTS) {
      await expect(page.locator('.inventory_item_name')).toContainText(product.name);
    }
  });

//   test('TC005 - Add a specific product by id and verify cart badge', async ({ page }) => {
//     const product = PRODUCTS[0];

//     await page.click(`#${product.id}`);
//     await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
//   });
});
