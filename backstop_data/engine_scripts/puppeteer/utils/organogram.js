// Waits for the image upload js to load on organogram resource views so that they can be tested for visuals effectively

module.exports = async (page) => {
    console.log('Waiting for organogram DOM elements to render...');
    await page.waitForSelector('.btn-remove-url');
};