import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './auth.helper.js';

test.describe('Login Page Tests', () => {
  test('TC001 - Valid login should redirect to inventory dashboard', async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('TC002 - Invalid login should show an error message', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'wrong_user');
    await page.fill('#password', 'wrong_pass');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('TC003 - Locked out user should see locked out message', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
