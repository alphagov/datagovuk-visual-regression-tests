// Waits for the slug-preview js to load on views with slug fields so that they can be visually tested effectively

module.exports = async (page) => {
    console.log('Waiting for slug preview DOM elements to render...');
    await page.waitForSelector('.slug-preview');
};