// Clears cookies between scenarios in order to reduce the chance of random puppeteer failures from memory leaks

module.exports = async (page, scenario, label) => {
    console.log(`Clearing cookies for scenario ${label}`);
  
    const cookies = await page.cookies(scenario.url);
  
    await Promise.all(
      cookies.map(async (cookie) => { page.deleteCookie(cookie) })
    );
  };