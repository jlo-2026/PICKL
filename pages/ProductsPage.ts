import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Inventory page
 * URL: https://www.saucedemo.com/inventory.html
 */
export class ProductsPage {
  readonly page: Page
  readonly shoppingCart: Locator

  constructor(page: Page) {
    this.page = page
    //this.shoppingCart = page.getByRole('link', { name: /shopping cart/i }) // Use a regex to match the link's accessible name
    this.shoppingCart = page.locator('a.shopping_cart_link[data-test="shopping-cart-link"]')
  }

  async clickAddtoCart(productName: string) {
    // const product = this.page.getByRole('button', { name: productName })
    const lowerCaseText = productName.toLowerCase().replace(/\s+/g, '-') //lower case of product Name, replace spaces with hyphens
    //console.log(`Lower case product name: ${lowerCaseText}`)
    const product = this.page.locator(`#add-to-cart-${lowerCaseText}`)
    await product.click()
  }
  async getCartBadgeCount() {
    const cartCounter = await this.shoppingCart.textContent()
    return cartCounter
  }

  async clickRemoveFromCart(productName: string) {
    // const product = this.page.getByRole('button', { name: productName })
    const lowerCaseText = productName.toLowerCase().replace(/\s+/g, '-') //lower case of product Name, replace spaces with hyphens
    //console.log(`Lower case product name: ${lowerCaseText}`)
    const product = this.page.locator(`#remove-${lowerCaseText}`)
    await product.click()
  }

  async addProductsToCart() {
    await this.clickAddtoCart('Sauce Labs Onesie')
    await this.clickAddtoCart('Sauce Labs Bike Light')
    await this.clickAddtoCart('Sauce Labs Bolt T-Shirt')
    await this.clickAddtoCart('Sauce Labs Fleece Jacket')
    await this.clickAddtoCart('Sauce Labs Backpack')
  }
}
