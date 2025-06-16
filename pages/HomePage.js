class HomePage{
    constructor(page){
        this.page = page;
        this.title = '.product_label';
        this.toggleMenu = '.bm-burger-button';
        this.logoutButton = '#logout_sidebar_link';
    }

    async isLoggedIn(){
        return await this.page.url().includes('inventory.html');
    }

    async getTitle(){
        return await this.page.textContent(this.title);
    }

    async clickLogout(){
        await this.page.click(this.toggleMenu);
        await this.page.click(this.logoutButton);
    }
}

module.exports = HomePage;