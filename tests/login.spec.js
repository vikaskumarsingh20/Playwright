import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
test('TC001 - Valid login should redirect to dashboard', async ({ page }) => {

// 1. Navigate (Manual: Open browser, go to URL)
await page.goto('https://www.saucedemo.com');

// 2. Action (Manual: Enter username)
await page.fill('#user-name', 'standard_user');
await page.fill('#password', 'secret_sauce');

// 3. Action (Manual: Click Login button)
await page.click('#login-button');

// 4. Assertion (Manual: Verify we're on dashboard)
await expect(page).toHaveURL(/inventory/);

await expect(page.locator('.title')).toHaveText('Products');
});

test('TC002 - Invalid login should show error', async ({ page }) => {
await page.goto('https://www.saucedemo.com');
await page.fill('#user-name', 'wrong_user');
await page.fill('#password', 'wrong_pass');
await page.click('#login-button');
// Negative test: error message should appear
await expect(page.locator('[data-test="error"]')).toBeVisible();
});
});

test('TC003 - Locked out user should see locked message', async ({ page }) => {
await page.goto('https://www.saucedemo.com');
await page.fill('#user-name', 'locked_out_user');
await page.fill('#password', 'secret_sauce');
await page.click('#login-button');
// Negative test: locked message should appear
await expect(page.locator('[data-test="error"]')).toBeVisible();
});
        