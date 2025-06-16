const BasePage = require('./BasePage');
class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.loginButton = '#login-button';
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.errorMessage = '[data-test="error"]';
    }

    async goto(){
        await this.page.goto('index.html');
    }

    async pressTab(){
        return await this.page.keyboard.press('Tab');
    }

    async pressShiftTab(){
        return await this.page.keyboard.press('Shift+Tab');
    }

    async isPasswordInputFocused(){
        return await this.page.$eval(this.passwordInput, el => document.activeElement === el);
    }
    async isUsernameInputFocused(){
        return await this.page.$eval(this.usernameInput, el => document.activeElement === el);
    }

    async isLoginButtonFocused(){
        return await this.page.$eval(loginButton, el => document.activeElement === el);
    }

    async enterUsername(username){
        return await this.page.fill(this.usernameInput, username);
    }

    async enterPassword(password){
        return await this.page.fill(this.passwordInput, password);
    }

    async clickLogin(){
        return await this.page.click(this.loginButton);
    }

    async login(username, password){
        await this.enterUsername(username);
        await this.enterPassword(password);
        await clickLogin();
    }
   
    async isErrorMessageVisible(){
        return await this.page.isVisible(this.errorMessage);
    }

    async getErrorMessage(){
        return await this.page.textContent(this.errorMessage);
    }

    async isUsernameInputVisible(){
        return await this.page.isVisible(this.usernameInput);
    }

    async isPasswordInputVisible(){
        return await this.page.isVisible(this.passwordInput);
    }
    
}
module.exports = LoginPage;