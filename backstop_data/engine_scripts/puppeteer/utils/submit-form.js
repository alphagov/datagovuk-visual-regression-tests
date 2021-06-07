// Submits a purposefully incomplete form in order to test error views

module.exports = async (page, label) => {
    console.log(`Submitting incomplete form for scenario ${label}...`);
    await Promise.all([
        page.evaluate(() => {
            var submit = document.querySelector('button[type="submit"]') ? document.querySelector('button[type="submit"]') : document.querySelector('input[type="submit"]')
            submit.click()
        }),
        page.waitForNavigation()
    ]);
}