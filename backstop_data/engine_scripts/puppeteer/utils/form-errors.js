const login = require('./login');

module.exports = async (page, scenario) => {
    await login(page, scenario);

    console.log(`Submitting form for scenario ${scenario.label}...`);
    await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation()
    ]);
}