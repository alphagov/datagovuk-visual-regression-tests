// Submits a purposefully incomplete form in order to test error views

module.exports = async (page, label) => {
    console.log(`Submitting incomplete form for scenario ${label}...`);
    await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation()
    ]);
}