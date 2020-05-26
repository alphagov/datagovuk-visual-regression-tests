require('dotenv').config();

module.exports = async (page, scenario) => {
    await page.goto(`${process.env.DOMAIN}/user/login`);
    await page.focus('#field-login');
    await page.keyboard.type(process.env.CKAN_USER);
    await page.focus('#field-password');
    await page.keyboard.type(process.env.CKAN_PASSWORD);
    await page.$eval('.form-horizontal', form => form.submit());
    await Promise.all([
        page.goto(scenario.url),
        page.waitForNavigation()
    ]);
};