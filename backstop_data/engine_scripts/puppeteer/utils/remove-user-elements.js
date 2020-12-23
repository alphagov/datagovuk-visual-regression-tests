// Removes the gravatar and the username, which can be dynamic and exist on all views, from a given scenario

module.exports = async (page) => {
  console.log(`Clearing user elements...`);

  await page.evaluate(() => {
    document.querySelector('.username').remove();

    const gravatars = document.querySelectorAll('.user-image');

    for (let i = 0; i < gravatars.length; i += 1) {
      gravatars[i].remove();
    }
  });
};