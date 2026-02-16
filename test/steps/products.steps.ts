import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ProductsPage } from '../../pages/ProductsPage.js'
import { LoginPage } from '../../pages/SLLoginPage.js'
import { ICustomWorld } from '../support/world.js'

Given('I am logged in as a standard user', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.goto()
  await loginPage.login('standard_user', 'secret_sauce')
})

When('I add to the cart {string}', async function (this: ICustomWorld, product: string) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const productsPage = new ProductsPage(this.page)
  await productsPage.clickAddtoCart(product)
})

Then(
  'I should see the cart icon with a badge showing {string}',
  async function (this: ICustomWorld, expectedCount: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const productsPage = new ProductsPage(this.page)
    const cartCount = await productsPage.getCartBadgeCount()
    expect(cartCount).toBe(expectedCount)
  },
)

Then(
  'I should see the Remove button for {string}',
  async function (this: ICustomWorld, productName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const productsPage = new ProductsPage(this.page)
    const lowerCaseText = productName.toLowerCase().replace(/\s+/g, '-')
    await expect(productsPage.page.locator(`#remove-${lowerCaseText}`)).toBeVisible()
  },
)
When('I remove from the cart {string}', async function (this: ICustomWorld, product: string) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const productsPage = new ProductsPage(this.page)
  await productsPage.clickRemoveFromCart(product)
})

Then(
  'I should see the Add to Cart button for {string}',
  async function (this: ICustomWorld, productName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const productsPage = new ProductsPage(this.page)
    const lowerCaseText = productName.toLowerCase().replace(/\s+/g, '-')
    //console.log(`Lower case product name: ${lowerCaseText}`)
    await expect(productsPage.page.locator(`#add-to-cart-${lowerCaseText}`)).toBeVisible()
  },
)
