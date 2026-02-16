import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Inventory page
 * URL: https://www.saucedemo.com/cart.html
 */
export class CheckOutPageTwo {
  readonly page: Page
  readonly finishButton: Locator
  readonly cancelButton: Locator

  constructor(page: Page) {
    this.page = page
    this.finishButton = page.getByRole('button', { name: 'Finish' })
    this.cancelButton = page.getByRole('button', { name: 'Cancel' })
  }

  /**
   * Check if a product is visible in the overview by its name
   * @param productName The name of the product to check
   * @returns True if the product is visible, false otherwise
   */
  async isProductVisible(productName: string): Promise<boolean> {
    const productLocator = this.page.getByRole('link', { name: productName }) // Assuming the product name is a link in the cart page
    return productLocator.isVisible()
  }
  async clickFinish() {
    await this.finishButton.click()
  }
  async clickCancel() {
    await this.cancelButton.click()
  }
}
