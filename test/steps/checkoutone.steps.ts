import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from 'playwright/test'
import { CheckOutPageOne } from '../../pages/CheckoutPageOne.js'
import { ProductsPage } from '../../pages/ProductsPage.js'
import { LoginPage } from '../../pages/SLLoginPage.js'
import { ICustomWorld } from '../support/world.js'

Given('I am in the cart page with added products', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.goto()
  await loginPage.login('standard_user', 'secret_sauce')
  const productsPage = new ProductsPage(this.page)
  await productsPage.addProductsToCart()
  await productsPage.shoppingCart.click()
})

When('I enter the first name {string}', async function (this: ICustomWorld, firstName: string) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkoutPageOne = new CheckOutPageOne(this.page)
  await checkoutPageOne.enterFirstName(firstName)
})

When('I enter the last name {string}', async function (this: ICustomWorld, lastName: string) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkoutPageOne = new CheckOutPageOne(this.page)
  await checkoutPageOne.enterLastName(lastName)
})

When('I enter the zip code {string}', async function (this: ICustomWorld, zipCode: string) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkoutPageOne = new CheckOutPageOne(this.page)
  await checkoutPageOne.enterZipPostal(zipCode)
})

When('I click the Continue button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkoutPageOne = new CheckOutPageOne(this.page)
  await checkoutPageOne.clickContinue()
})

Then('I should be on the checkout page two', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  await expect(this.page).toHaveURL(/checkout-step-two.html/)
})

Then(
  'I should see an error message in the checkout page {string}',
  async function (this: ICustomWorld, expectedMessage: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const checkoutPageOne = new CheckOutPageOne(this.page)
    const errorMessage = await checkoutPageOne.getErrorMessage()
    expect(errorMessage).toContain(expectedMessage)
  },
)

When('I click the Cancel button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkoutPageOne = new CheckOutPageOne(this.page)
  await checkoutPageOne.clickCancel()
})
