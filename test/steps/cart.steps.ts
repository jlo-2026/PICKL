import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CartPage } from '../../pages/CartPage.js'
import { CheckOutPageOne } from '../../pages/CheckoutPageOne.js'
import { ProductsPage } from '../../pages/ProductsPage.js'
import { LoginPage } from '../../pages/SLLoginPage.js'
import { ICustomWorld } from '../support/world.js'

Given('I have added products to my cart', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.goto()
  await loginPage.login('standard_user', 'secret_sauce')
  // await loginPage.enterUsername('standard_user')
  // await loginPage.enterPassword('secret_sauce')
  // await loginPage.clickLogin()
  const productsPage = new ProductsPage(this.page)
  await productsPage.addProductsToCart()
})

When('I click the cart icon', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const productsPage = new ProductsPage(this.page)
  await productsPage.shoppingCart.click()
})

Then('I should be on the cart page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const cartPage = new CartPage(this.page)
  await expect(cartPage.continueShopping).toBeVisible() // Ensure we're on the cart page before proceeding
  await expect(cartPage.checkoutButton).toBeVisible()
})

Then(
  'I should see in my cart the product {string}',
  async function (this: ICustomWorld, productName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const cartPage = new CartPage(this.page)
    expect(await cartPage.isProductVisible(productName)).toBeTruthy()
  },
)

When(
  'I remove the product {string} from the cart',
  async function (this: ICustomWorld, productName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const cartPage = new CartPage(this.page)
    await cartPage.clickRemoveFromCart(productName)
  },
)

Then(
  'I should not see in my cart the product {string}',
  async function (this: ICustomWorld, productName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const cartPage = new CartPage(this.page)
    // expect(await cartPage.isProductVisible(productName)).toBeFalsy()
    const productLocator = cartPage.page.getByRole('link', { name: productName }) // Assuming the product name is a text element in the cart page
    expect(await productLocator.count()).toBe(0) // Expect the product to no longer be visible in the cart
    //console.log('No. of listitems: ', await cartPage.page.getByRole('link').count())
    // console.log(
    //   `Checked that Sauce Labs Fleece Jacket count: `,
    //   await cartPage.page.getByRole('link', { name: 'Sauce Labs Fleece Jacket' }).count(),
    // )
    // console.log(`Checked that product "${productName}" count: `, await productLocator.count())
  },
)

Then(
  'the cart badge count should be updated to {string}',
  async function (this: ICustomWorld, itemCount: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }
    const cartPage = new CartPage(this.page)
    const cartCount = await cartPage.getCartBadgeCount()
    expect(cartCount).toBe(itemCount)
  },
)

When('I click the Continue Shopping button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const cartPage = new CartPage(this.page)
  await cartPage.continueShopping.click()
})

Then('I should be on the products page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const productsPage = new ProductsPage(this.page)
  await expect(productsPage.page).toHaveURL(/inventory.html/)
})

Then('I should be on the checkout page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const checkOutPageOne = new CheckOutPageOne(this.page)
  await expect(checkOutPageOne.page).toHaveURL(/checkout-step-one.html/)
})

When('I click the Checkout button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const cartPage = new CartPage(this.page)
  await cartPage.checkoutButton.click()
})
