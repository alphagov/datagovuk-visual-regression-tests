const login = require('../utils/login');

module.exports = async (page, scenario) => {
    await login(page, scenario);

    console.log('Waiting for organogram DOM elements to render...');
    await page.waitForSelector('.btn-remove-url');
};