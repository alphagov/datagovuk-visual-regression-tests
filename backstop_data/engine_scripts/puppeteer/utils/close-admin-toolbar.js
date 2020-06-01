module.exports = async (page) => {
    console.log('closing ckan admin toolbar...');
    await page.click('#flHideToolBarButton');
}