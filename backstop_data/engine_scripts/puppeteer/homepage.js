const login = require('./utils/login');

module.exports = async (page, scenario) => {
    await login(page, scenario);
    await page.click('#flHideToolBarButton');
};