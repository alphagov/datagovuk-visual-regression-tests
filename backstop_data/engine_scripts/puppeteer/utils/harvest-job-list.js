// Clears dynamic harvest job list elements

module.exports = async (page) => {
    console.log(`Clearing dataetime for harvest job list...`);
  
    await page.evaluate(() => {
      const datetimes = document.querySelectorAll('.automatic-local-datetime');
      const jobHeadings = document.querySelectorAll('.dataset-heading');

      for (let i = 0; i < datetimes.length; i += 1) {
        datetimes[i].innerHTML = '';
      }

      for (let i = 0; i < jobHeadings.length; i += 1) {
        jobHeadings[i].innerHTML = 'Job title';
      }
    });
  };