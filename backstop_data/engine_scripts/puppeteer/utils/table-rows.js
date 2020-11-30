// Explicitly removes the content of 2nd table row of data tables for views where they exist to avoid unexpected changes in height from the values on the table

module.exports = async (page) => {
    console.log('Fixing height of table rows...');

    await page.evaluate(() => {
        const secondTableCell = document.querySelectorAll('table.table td:nth-child(2)');

        for (let i = 0; i < secondTableCell.length; i += 1) {
            secondTableCell[i].innerHTML = '';
        }
    });
};