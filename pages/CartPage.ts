import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Inventory page
 * URL: https://www.saucedemo.com/cart.html
 */
export class CartPage {
  readonly page: Page
  readonly continueShopping: Locator
  readonly checkoutButton: Locator
  readonly shoppingCart: Locator

  constructor(page: Page) {
    this.page = page
    this.continueShopping = page.getByRole('button', { name: 'Continue Shopping' })
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
    this.shoppingCart = page.locator('a.shopping_cart_link[data-test="shopping-cart-link"]')
  }

  /**
   * Check if the Continue Shopping button is visible on the cart page
   * @returns True if the Continue Shopping button is visible, false otherwise
   */
  async isContinueShoppingVisible(): Promise<boolean> {
    const continueShoppingButton = this.continueShopping
    return continueShoppingButton.isVisible()
  }
  /**
   * Check if a product is visible in the cart by its name
   * @param productName The name of the product to check
   * @returns True if the product is visible, false otherwise
   */
  async isProductVisible(productName: string): Promise<boolean> {
    const productLocator = this.page.getByRole('link', { name: productName }) // Assuming the product name is a link in the cart page
    return productLocator.isVisible()
  }

  async clickRemoveFromCart(productName: string) {
    const lowerCaseText = productName.toLowerCase().replace(/\s+/g, '-') //lower case of product Name, replace spaces with hyphens
    //console.log(`Lower case product name: ${lowerCaseText}`)
    const product = this.page.locator(`#remove-${lowerCaseText}`)
    await product.click()
  }

  async getCartBadgeCount() {
    const cartCounter = await this.shoppingCart.textContent()
    return cartCounter
  }
}
