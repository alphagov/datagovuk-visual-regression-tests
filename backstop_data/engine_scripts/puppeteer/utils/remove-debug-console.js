// Completely removes the debug dashboard from views so it doesn't interfere with interaction with specific views

module.exports = async (page) => {
    console.log('Removing debug console...');
    await page.evaluate(() => {
        const debugText = document.getElementsByClassName('.debug')[0];
        const debugSidebar = document.getElementById('flDebug');

        if (debugText) {
            debugText.remove();
        }

        if (debugSidebar) {
            debugSidebar.remove();
        }
    });
}