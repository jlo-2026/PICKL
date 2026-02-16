import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Login page
 * URL: https://www.saucedemo.com/
 */
export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly pageHeading: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.getByRole('textbox', { name: 'Username' })
    this.passwordInput = page.getByRole('textbox', { name: 'Password' })
    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.pageHeading = page.locator('.login_logo')
    //element locator for the error message
    // this.errorMessage = page.getByRole('heading', {
    //   name: /(Epic sadface: Username and password do not match any user in this service|Epic sadface: Username is required|Epic sadface: Sorry, this user has been locked out.|Epic sadface: Password is required)/,
    // })
    this.errorMessage = page.getByRole('heading', { name: /^Epic sadface:/ })
  }
  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto('/')
  }

  /**
   * Enter username into the username field
   * @param username - The username to enter
   */
  async enterUsername(username: string) {
    await this.usernameInput.fill(username)
  }

  /**
   * Enter password into the password field
   * @param password - The password to enter
   */
  async enterPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    await this.loginButton.click()
  }

  /**
   * Perform complete login action
   * @param username - The username to login with
   * @param password - The password to login with
   */
  async login(username: string, password: string) {
    await this.enterUsername(username)
    await this.enterPassword(password)
    await this.clickLogin()
  }

  /**
   * Get the flash message text (success or error)
   * @returns The flash message text without the close button
   */
  async getErrorMessage(): Promise<string> {
    const text = await this.errorMessage.textContent()
    return text?.replace('×', '').trim() ?? ''
  }

  /**
   * Check if currently on the login page
   * @returns True if on login page, false otherwise
   */
  async isOnLoginPage(): Promise<boolean> {
    const pageHeadingTxt = (await this.pageHeading.textContent()) ?? ''
    return (
      (await this.loginButton.isVisible()) &&
      (await this.usernameInput.isVisible()) &&
      (await this.passwordInput.isVisible()) &&
      pageHeadingTxt.includes('Swag Labs')
    )
  }
}
