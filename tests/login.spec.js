const { test, expect } = require('./base/BaseTest');


test.describe('Login Page Test Suite', () => {

    test('Login with valid credentials', async({loginPage, homePage}) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(await homePage.isLoggedIn()).toBeTruthy();
        await expect(await homePage.getTitle()).toBe('Products');
    });

    test('Login with blank username and valid password', async ({loginPage, homePage})=>{
        await loginPage.login('','secret_sauce');
        await expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
        await expect(await loginPage.getErrorMessage()).toContain('Username is required');
    });
})