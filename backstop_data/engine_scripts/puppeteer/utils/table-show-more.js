// Waits for and then clicks the show more functionality on data tables to avoid inconsistency with puppeteer beating the js 

module.exports = async (page, label) => {
    console.log('waiting for and activating table show more functionality...');

    await page.evaluate(() => {
      const toggleTable = document.querySelector(`table[data-module="table-toggle-more"]`);

      toggleTable.classList.remove('table-toggle-more');
      toggleTable.dataset.module = '';
    });
  };