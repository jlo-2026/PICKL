import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from 'playwright/test'
import { CartPage } from '../../pages/CartPage.js'
import { CheckOutCompletePage } from '../../pages/CheckoutCompletePage.js'
import { CheckOutPageOne } from '../../pages/CheckoutPageOne.js'
import { ProductsPage } from '../../pages/ProductsPage.js'
import { LoginPage } from '../../pages/SLLoginPage.js'
import { ICustomWorld } from '../support/world.js'

Given('I am in the order summary page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.goto()
  await loginPage.login('standard_user', 'secret_sauce')
  const productsPage = new ProductsPage(this.page)
  await productsPage.addProductsToCart()
  await productsPage.shoppingCart.click()
  const cartPage = new CartPage(this.page)
  await cartPage.checkoutButton.click()
  const checkoutPageOne = new CheckOutPageOne(this.page) // Ensure we're on the checkout page one before proceeding
  await checkoutPageOne.enterChkOutInfo('Harry James', 'Potter', 'PICKL007')
  await checkoutPageOne.clickContinue()
})

Then(
  'I should see a confirmation message {string}',
  async function (this: ICustomWorld, confirmationMsg: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const checkoutCompletePage = new CheckOutCompletePage(this.page)
    const thankYouMessage = await checkoutCompletePage.getThankYouMessage()
    expect(thankYouMessage).toBe(confirmationMsg)
  },
)

Then(
  'I should see an order complete message {string}',
  async function (this: ICustomWorld, confirmationMsg: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const checkoutCompletePage = new CheckOutCompletePage(this.page)
    const orderCompleteMessage = await checkoutCompletePage.getOrderCompleteMessage()
    expect(orderCompleteMessage).toBe(confirmationMsg)
  },
)

Then('I should see the Pony Express image', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkoutCompletePage = new CheckOutCompletePage(this.page)
  //console.log('Check image locator:', checkoutCompletePage.checkImage.isVisible())
  expect(await checkoutCompletePage.checkImage.isVisible()).toBeTruthy()
})

Then('I should see a Back Home button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkoutCompletePage = new CheckOutCompletePage(this.page)
  expect(await checkoutCompletePage.backHomeButton.isVisible()).toBeTruthy()
})

Then(
  'I should see a page title {string}',
  async function (this: ICustomWorld, expectedTitle: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const checkoutCompletePage = new CheckOutCompletePage(this.page)
    const actualTitle = await checkoutCompletePage.getPageTitle()
    expect(actualTitle).toBe(expectedTitle)
  },
)

Then('The cart badge count should be empty', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkoutCompletePage = new CheckOutCompletePage(this.page)
  const cartBadgeCount = await checkoutCompletePage.getCartBadgeCount()
  expect(cartBadgeCount).toBe('')
})

When('I click the Back Home button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkoutCompletePage = new CheckOutCompletePage(this.page)
  await checkoutCompletePage.backHomeButton.click()
})
