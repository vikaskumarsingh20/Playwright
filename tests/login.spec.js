import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './auth.helper.js';

test.describe('Login Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Ensure every test starts on the login page
    await page.goto('https://www.saucedemo.com');
  });

  // --- POSITIVE CASES ---
  test('TC001 - Valid login should redirect to inventory dashboard', async ({ page }) => {
    // Reusing your existing helper pattern
    await loginAsStandardUser(page); 
    await expect(page).toHaveURL(/inventory/);
  });

  // --- NEGATIVE CASES ---
  test('TC002 - Invalid login should show an error message', async ({ page }) => {
    await page.fill('#user-name', 'wrong_user');
    await page.fill('#password', 'wrong_pass');
    await page.click('#login-button');

    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Username and password do not match any user in this service');
  });

  test('TC003 - Locked out user should see locked out message', async ({ page }) => {
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Sorry, this user has been locked out');
  });

  test('TC004 - Empty fields should trigger username error', async ({ page }) => {
    // Clicking login without typing anything
    await page.click('#login-button');

    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Username is required');
  });

  test('TC005 - Missing password should trigger password error', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.click('#login-button');

    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Password is required');
  });

  // --- EDGE & UI CASES ---
  test('TC006 - Clicking the error close button should hide the error message', async ({ page }) => {
    await page.click('#login-button'); // Triggers error
    
    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();

    // Click the "X" close button inside the error container
    await page.click('.error-button'); 
    await expect(errorLocator).not.toBeVisible();
  });

  test('TC007 - Password visibility should be masked', async ({ page }) => {
    const passwordInput = page.locator('#password');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
