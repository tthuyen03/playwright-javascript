class HomePage{
    constructor(page){
        this.page = page;
        this.title = '.product_label';
    }

    async isLoggedIn(){
        return await this.page.url().includes('inventory.html');
    }

    async getTitle(){
        return await this.page.textContent(this.title);
    }
}

module.exports = HomePage;