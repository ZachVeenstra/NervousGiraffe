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

When('I visit the artists page', () => {
    // get returns a promise. Remember to return this promise
    // so the runner knows when to move onto the next step.
    return driver.get('http://localhost:3000/artworks')
})

Given('I click the create artwork button', async () => {
    const createButton = await driver.findElement(By.id('create-artwork'));
    // await driver.wait(until.elementIsVisible(createButton), 6000);
    createButton.click();
})

Then('A modal, titled {string} should appear', async (title) => {
    const modalTitle = await driver.findElement(By.className('modal-title h4'));
    expect(await modalTitle.getText()).toBe(title)
})
