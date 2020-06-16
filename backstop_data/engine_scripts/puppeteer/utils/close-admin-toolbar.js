// Closes the admin toolbar that pops up on certain views

module.exports = async (page) => {
    console.log('closing ckan admin toolbar...');
    await page.click('#flHideToolBarButton');
}