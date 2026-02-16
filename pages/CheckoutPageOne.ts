import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Inventory page
 * URL: https://www.saucedemo.com/cart.html
 */
export class CheckOutPageOne {
  readonly page: Page
  readonly firstName: Locator
  readonly lastName: Locator
  readonly zipPostal: Locator
  readonly continueButton: Locator
  readonly cancelButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.firstName = page.getByRole('textbox', { name: 'First Name' })
    this.lastName = page.getByRole('textbox', { name: 'Last Name' })
    this.zipPostal = page.getByRole('textbox', { name: 'Zip/Postal Code' })
    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.cancelButton = page.getByRole('button', { name: 'Cancel' })
    this.errorMessage = page.getByRole('heading', {
      name: /(Error: First Name is required|Error: Last Name is required|Error: Postal Code is required)/,
    })
  }

  /**
   * Enter first name into the first name field
   * @param firstname - The first name to enter
   */
  async enterFirstName(firstname: string) {
    await this.firstName.fill(firstname)
  }

  /**
   * Enter last name into the last name field
   * @param lastname - The last name to enter
   */
  async enterLastName(lastname: string) {
    await this.lastName.fill(lastname)
  }

  /**
   * Enter zip/postal code into the zip/postal code field
   * @param zipPostal - The zip/postal code to enter
   */
  async enterZipPostal(zipPostal: string) {
    await this.zipPostal.fill(zipPostal)
  }

  async clickContinue() {
    await this.continueButton.click()
  }

  async clickCancel() {
    await this.cancelButton.click()
  }
  async getErrorMessage(): Promise<string> {
    const text = await this.errorMessage.textContent()
    return text?.replace('×', '').trim() ?? ''
  }

  async enterChkOutInfo(firstname: string, lastname: string, zipPostal: string) {
    await this.firstName.fill(firstname)
    await this.lastName.fill(lastname)
    await this.zipPostal.fill(zipPostal)
  }
}
