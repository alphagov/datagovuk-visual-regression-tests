// Waits for the image upload js to load on views with image upload fields (eg: organogram) so that they can be visually tested effectively

module.exports = async (page) => {
    console.log('Waiting for upload DOM elements to render...');
    await page.waitForSelector('.btn-remove-url');
};