import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Login page
 * URL: https://www.saucedemo.com/
 */
export class SideMenu {
  readonly page: Page
  readonly sideMenuButton: Locator
  readonly allItemslink: Locator
  readonly aboutLink: Locator
  readonly ResetAppStateLink: Locator
  readonly logOutLink: Locator

  constructor(page: Page) {
    this.page = page
    this.sideMenuButton = page.getByRole('button', { name: 'Open Menu' })
    this.allItemslink = page.getByRole('link', { name: 'All Items' })
    this.aboutLink = page.getByRole('link', { name: 'About' })
    this.ResetAppStateLink = page.getByRole('link', { name: 'Reset App State' })
    this.logOutLink = page.getByRole('link', { name: 'Logout' })
  }
  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto('/')
  }
}
