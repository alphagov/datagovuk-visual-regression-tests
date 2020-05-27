const login = require('./utils/login');

module.exports = async (page, scenario) => {
    await login(page, scenario);

    console.log('closing ckan admin toolbar for homepage testing...');
    await page.click('#flHideToolBarButton');
};