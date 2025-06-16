const { test, expect } = require('./base/BaseTest');
const DataDrivenUtils = require('../utils/DataDrivenUtils');
const dataTest = require('../test-data/login-data.json');
const HomePage = require('../pages/HomePage');
const users = dataTest;


test.describe('Login Page Test Suite', () => {
  
  test('Verify that user can back to correct field by Tab button', async ({loginPage}) => {
        await test.step('Step 1: Press Tab to focus on the username field', async () => {
            await loginPage.pressTab();
            expect(await loginPage.isUsernameInputFocused()).toBeTruthy();
        });
        await test.step('Step 2: Press Tab to focus on the username field', async () => {
            await loginPage.pressTab();
            expect(await loginPage.isPasswordInputFocused()).toBeTruthy();
        });
        await test.step('Step 3: Press Tab to focus on the login button', async () => {
            await loginPage.pressTab();
            expect(await loginPage.isLoginButtonFocused()).toBeTruthy();
        });

    });

    test('Verify that user can back to correct field by Shift Tab button', async ({ loginPage }) => {
        await test.step('Step 1: Press Shift+Tab to focus on the login button', async () => {
            await loginPage.pressShiftTab();
            expect(await loginPage.isLoginButtonFocused()).toBeTruthy();
        });
        await test.step('Step 2: Press Shift+Tab to focus on the password field', async () => {
            await loginPage.pressShiftTab();
            expect(await loginPage.isPasswordInputFocused()).toBeTruthy();
        });
        await test.step('Step 3: Press Shift+Tab to focus on the username field', async () => {
            await loginPage.pressShiftTab();
            expect(await loginPage.isUsernameInputFocused()).toBeTruthy();
        });
    });



  for (const user of users) {
    test(`${user.testsummary}`, async ({ loginPage, homePage }) => {

      await test.step('Step 1: Perform login', async () => {
        await loginPage.login(user.username, user.password);
      });

      if (user.expectedOutcome === 'success') {
        await test.step('Step 2: Verify login success', async () => {
          await expect(await homePage.isLoggedIn()).toBeTruthy();
          await expect(await homePage.getTitle()).toBe('Products');
        });
      } else {
        await test.step('Step 2: Verify error message on login failure', async () => {
          await expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
          await expect(await loginPage.getErrorMessage()).toContain(user.expectedErrorMessage);
        });
      }
    });
  }

  test('Verify that user can login successfully after a failed login attempt', async ({loginPage, homePage}) =>{
      await test.step('Step 1: Login fail in first attempt', async () => {
        const invalidDataLogin = dataTest.find(inv => inv.testsummary === "Login with leading space in username");
        await loginPage.login(invalidDataLogin.username, invalidDataLogin.password);
        await expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
        await expect(await loginPage.getErrorMessage()).toContain(invalidDataLogin.expectedErrorMessage);
      });

      await test.step('Step 2: Login again with valid credentials', async () => {
        const validDataLogin = dataTest.find(val => val.testsummary === 'Login with valid username and password');
        await loginPage.login(validDataLogin.username, validDataLogin.password);
        await expect(await homePagePage.isLoggedIn()).toBeTruthy();
        await expect(await homePage.getTitle()).toContain('Products');
      });
    });

    test('Verify session behavior when logging in multiple tabs of the same browser', async ({context, loginPage, homePage}) => {
        await test.step('1. Login with valid credentials', async () => {
        const validDataLogin = dataTest.find(val => val.testsummary === 'Login with valid username and password');
        await loginPage.login(validDataLogin.username, validDataLogin.password);
        await expect(await homePagePage.isLoggedIn()).toBeTruthy();
        await expect(await homePage.getTitle()).toContain('Products');
      });

      await test.step('2. Open a new tab in the same browser context', async () => {
        const newPage = await context.newPage();
        await newPage.goto('https://www.saucedemo.com/inventory.html');
        const newHomePage = new HomePage(newPage);
        await expect(await newHomePage.isLoggedIn()).toBeTruthy();
        await expect(await newHomePage.getTitle()).toContain('Products');

      });
    });

    test('Verify that login successfully after logout', async ({loginPage, homePage}) => {
       await test.step('1. Login with valid credentials', async () => {
        const validDataLogin = dataTest.find(val => val.testsummary === 'Login with valid username and password');
        await loginPage.login(validDataLogin.username, validDataLogin.password);
        await expect(await homePagePage.isLoggedIn()).toBeTruthy();
        await expect(await homePage.getTitle()).toContain('Products');
      });

      await test.step('2. Logout', async () => {
        await homePage.clickLogout();
        await expect(await loginPage.isUsernameInputVisible()).toBeTruthy();
        await expect(await loginPage.isPasswordInputVisible()).toBeTruthy();
      });

      await test.step('3. Login with valid credentials again', async () => {
        const validDataLogin = dataTest.find(val => val.testsummary === 'Login with valid username and password');
        await loginPage.login(validDataLogin.username, validDataLogin.password);
        await expect(await homePagePage.isLoggedIn()).toBeTruthy();
        await expect(await homePage.getTitle()).toContain('Products');
      });
    });

    test('Verify that login successfully after session expiration', async () => {
      await test.step('1. Login with valid credentials', async () => {
        const validDataLogin = dataTest.find(val => val.testsummary === 'Login with valid username and password');
        await loginPage.login(validDataLogin.username, validDataLogin.password);
        await expect(await homePagePage.isLoggedIn()).toBeTruthy();
        await expect(await homePage.getTitle()).toContain('Products');
      })

    });

    test('Verify that the login fails when the network connection is lost during the login attempt', async ({page, loginPage, homePage}) => {
      await test.step('1. Fill username and password', async () => {
        const validDataLogin = dataTest.find(val => val.testsummary === 'Login with valid username and password');
        await loginPage.enterUsername(validDataLogin.username);
        await loginPage.enterPassword(validDataLogin.password);
      });

      await test.step('2. Simulate network offline before clicking login', async () => {
        await page.context().setOffline(true);
      });

      await test.step('3. Attempt to login', async () => {
        await loginPage.clickLoginButton();
      });

      await test.step('4. Verify login fails due to network issue', async () => {
        await expect(await homePage.isLoggedIn()).toBeFalsy();
      });

      await test.step('5. Restore network for next test', async () => {
        await page.context().setOffline(false);
      });
    });
});
