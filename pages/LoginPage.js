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

    async login(username, password){
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
   
    async isErrorMessageVisible(){
        return await this.page.isVisible(this.errorMessage);
    }


    async getErrorMessage(){
        return await this.page.textContent(this.errorMessage);
    }

    
}
module.exports = LoginPage;