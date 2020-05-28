require('dotenv').config();

module.exports = async (page, scenario) => {
    console.log(`Running scenario: ${scenario.label}. Logging in...`);

    await page.goto(`${process.env.DOMAIN}/user/login`);
    await page.focus('#field-login');
    await page.keyboard.type(process.env.CKAN_USER);
    await page.focus('#field-password');
    await page.keyboard.type(process.env.CKAN_PASSWORD);
    await Promise.all([
        page.$eval('.form-horizontal', form => form.submit()),
        page.waitForNavigation()
    ]);

    console.log(`Scenario ${scenario.label} logged in successfully. Going to page...`);

    await Promise.all([
        page.goto(scenario.url),
        page.waitForNavigation()
    ]);

    console.log(`Login script complete for scenario ${scenario.label}`);
};