require('dotenv').config();

module.exports = async (page, scenario, label) => {
    console.log(`Logging in for scenario ${label}...`);

    await Promise.all([
        page.goto(`${process.env.DOMAIN}/user/login`),
        page.waitForNavigation()
    ]);
    await page.focus('#field-login');
    await page.keyboard.type(process.env.CKAN_USER);
    await page.focus('#field-password');
    await page.keyboard.type(process.env.CKAN_PASSWORD);
    await Promise.all([
        page.$eval('.form-horizontal', form => form.submit()),
        page.waitForNavigation()
    ]);

    console.log(`Scenario ${label} logged in successfully. Going to page...`);

    await Promise.all([
        page.goto(scenario.url),
        page.waitForNavigation()
    ]);
};