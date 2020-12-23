// Waits for the select2 js to load on views with custom select fields so that they can be visually tested effectively

module.exports = async (page) => {
    console.log('Waiting for select2 DOM elements to render...');
    await page.waitForSelector('.select2-container');

    await page.evaluate(() => {
        const arrows = document.querySelectorAll('.select2-arrow');

        for (let i = 0; i < arrows.length; i += 1) {
            arrows[i].remove();
        }
    })
};