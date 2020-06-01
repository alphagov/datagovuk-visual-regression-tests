module.exports = async (page) => {
    console.log('Waiting for organogram DOM elements to render...');
    await page.waitForSelector('.btn-remove-url');
};