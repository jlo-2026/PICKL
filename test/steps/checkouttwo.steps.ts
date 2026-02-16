import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from 'playwright/test'
import { CartPage } from '../../pages/CartPage.js'
import { CheckOutPageOne } from '../../pages/CheckoutPageOne.js'
import { CheckOutPageTwo } from '../../pages/CheckoutPageTwo.js'
import { ProductsPage } from '../../pages/ProductsPage.js'
import { LoginPage } from '../../pages/SLLoginPage.js'
import { ICustomWorld } from '../support/world.js'

Given('I am in the checkout page one with added products', async function (this: ICustomWorld) {
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
  //await checkoutPageOne.clickContinue()
})

Then(
  'I should see {string} in the overview page',
  async function (this: ICustomWorld, productName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const checkOutPageTwo = new CheckOutPageTwo(this.page)
    expect(await checkOutPageTwo.isProductVisible(productName)).toBeTruthy()
  },
)

When('I click the Cancel button of the order summary page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkoutPageTwo = new CheckOutPageTwo(this.page)
  await checkoutPageTwo.clickCancel()
})

When('I click the Finish button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkoutPageTwo = new CheckOutPageTwo(this.page)
  await checkoutPageTwo.clickFinish()
})

Then('I should be on the checkout complete page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  await expect(this.page).toHaveURL(/checkout-complete.html/)
})
