import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.locator('[data-test="firstName"]');
    this.lastNameField = page.locator('[data-test="lastName"]');
    this.postalCodeField = page.locator('[data-test="postalCode"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async verifyCheckoutInformationPage() {
    await expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
    await expect(this.firstNameField).toBeVisible();
    await expect(this.lastNameField).toBeVisible();
    await expect(this.postalCodeField).toBeVisible();
  }

  async fillInformation(firstName, lastName, postalCode) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
  }

  async verifyOverviewPage() {
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
    await expect(this.page.getByText('Payment Information:')).toBeVisible();
    await expect(this.page.getByText('Shipping Information:')).toBeVisible();
  }

  async verifyProductSummary(productName) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async verifyOrderComplete() {
    await expect(this.page.getByText('Checkout: Complete!')).toBeVisible();
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }
}
