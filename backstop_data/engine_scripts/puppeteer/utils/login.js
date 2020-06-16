// Mocks user login into the ckan admin panel UI

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

    const cookies = await page.cookies();

    if(cookies.find(cookie => cookie.name === 'ckan') !== undefined) {
        console.log(`Scenario ${label} logged in successfully. Going to page...`);

        // Go to scenario URL after login
        await Promise.all([
            page.goto(scenario.url),
            page.waitForNavigation()
        ]);
    } else {
        throw new Error(`Login failed for ${label}. Please ensure that the credentials in your .env are correct or that your local ckan instance is running properly.`);
    }
};