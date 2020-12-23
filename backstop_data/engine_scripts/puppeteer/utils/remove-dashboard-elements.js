// removes common dynamic elements related to dashboard views across the ckan admin panel

module.exports = async (page) => {
  console.log(`Clearing dashboard elements...`);

  await page.evaluate(() => {
    const actors = document.querySelectorAll('.actor');
    const dates = document.querySelectorAll('.date');

    for (let i = 0; i < actors.length; i += 1) {
      actors[i].remove();
    }

    for (let i = 0; i < dates.length; i += 1) {
      dates[i].remove();
    }
  });
};