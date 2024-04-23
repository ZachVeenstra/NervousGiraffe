const { Given, When, Then, Before, AfterAll } = require('@cucumber/cucumber')
const { Builder, By, } = require('selenium-webdriver')
const { expect } = require('expect')  // The matchers from Jest

let driver = new Builder().forBrowser('chrome').build()

Before(() => {
  driver.get('http://localhost:3000/')
})


AfterAll(() => {
  if (driver !== null) {
    driver.quit
  }
})

When('I click the login button on the navbar', async () => {
  const loginButton = await driver.findElement(By.id("nav-login"));
  loginButton.click();
})

When('I type in my email {string}', async (email) => {
  const emailInput = await driver.findElement(By.id("auth-email"));
  emailInput.sendKeys(email)
})

When('I type in my password {string}', async (password) => {
  const passwordInput = await driver.findElement(By.id("auth-password"));
  passwordInput.sendKeys(password)
})

When('I click the login button', async () => {
  const loginButton = await driver.findElement(By.id('auth-login'));
  loginButton.click();
})

Then('I should be on the home page', async () => {
  expect(driver.getCurrentUrl() === 'http://localhost:3000/');
})


When('I visit the artworks page', async () => {
    const loginButton = await driver.findElement(By.id("nav-artworks"));
    loginButton.click();
})

Given('I click the create artwork button', async () => {
    const createButton = await driver.findElement(By.id('create-artwork'));
    createButton.click();
})

Then('A modal, titled {string} should appear', async (title) => {
    const modalTitle = await driver.findElement(By.className('modal-title h4'));
    expect(await modalTitle.getText()).toBe(title)
})
