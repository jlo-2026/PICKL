import { Then, When } from '@cucumber/cucumber'
import { expect } from 'playwright/test'
import { SideMenu } from '../../pages/SideMenu.js'
import { LoginPage } from '../../pages/SLLoginPage.js'
import { ICustomWorld } from '../support/world.js'

When('I click the side menu button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const sideMenu = new SideMenu(this.page)
  await sideMenu.sideMenuButton.click()
})

When('I click the About link', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const sideMenu = new SideMenu(this.page)
  await sideMenu.aboutLink.click()
})

//improve this
Then('I should be on the Sauce Labs website', function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  expect(this.page.url()).toBe('https://saucelabs.com/')
})

When('I click the All Items link', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const sideMenu = new SideMenu(this.page)
  await sideMenu.allItemslink.click()
})

Then('I click the Reset App State link', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const sideMenu = new SideMenu(this.page)
  await sideMenu.ResetAppStateLink.click()
})

When('I click the Logout link', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const sideMenu = new SideMenu(this.page)
  await sideMenu.logOutLink.click()
})

Then('I should be on the login page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const loginPage = new LoginPage(this.page)
  expect(await loginPage.isOnLoginPage()).toBeTruthy()
})
