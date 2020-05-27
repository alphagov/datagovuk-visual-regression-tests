const login = require('./login');

module.exports = async (page, scenario) => {
    await login(page, scenario);
    await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation()
    ]);
}