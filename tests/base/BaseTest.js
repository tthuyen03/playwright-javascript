const { test: baseTest, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');

//Extend base test
const test = baseTest.extend({
    loginPage : async ({page},use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage : async ({page},use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    }
});


test.beforeEach(async ({loginPage}) => {
    await loginPage.goto();
});

test.afterEach(async ({page}) => {
    await page.close();
});

module.exports = { test, expect };