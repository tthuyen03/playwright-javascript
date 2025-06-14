class BasePage{
    constructor(page) {
        this.page = page;
    }

    async navigateTo(path = '/'){
        await this.page.goto(path);
    }
}
module.exports = BasePage;
