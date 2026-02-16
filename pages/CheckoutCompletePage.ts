import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Inventory page
 * URL: https://www.saucedemo.com/cart.html
 */
export class CheckOutCompletePage {
  readonly page: Page
  readonly shoppingCartIcon: Locator
  readonly pageTitle: Locator
  readonly checkImage: Locator
  readonly thankYouMessage: Locator
  readonly orderCompleteMessage: Locator
  readonly backHomeButton: Locator
  readonly shoppingCart: Locator

  constructor(page: Page) {
    this.page = page
    this.shoppingCartIcon = page.locator('a.shopping_cart_link[data-test="shopping-cart-link"]')
    this.pageTitle = page.getByText('Checkout: Complete!')
    this.checkImage = page.getByAltText('Pony Express')
    this.thankYouMessage = page.getByRole('heading', { name: 'Thank you for your order!' })
    this.orderCompleteMessage = page.getByText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    )
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' })
    this.shoppingCart = page.locator('a.shopping_cart_link[data-test="shopping-cart-link"]')
  }

  async getThankYouMessage(): Promise<string> {
    const text = await this.thankYouMessage.textContent()
    return text ?? ''
  }

  async getOrderCompleteMessage(): Promise<string> {
    const text = await this.orderCompleteMessage.textContent()
    return text ?? ''
  }
  async getPageTitle(): Promise<string> {
    const text = await this.pageTitle.textContent()
    return text ?? ''
  }

  async getCartBadgeCount() {
    const cartCounter = await this.shoppingCart.textContent()
    return cartCounter
  }
}
