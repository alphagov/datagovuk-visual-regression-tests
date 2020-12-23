// Explicitly sets the height of textarea fields on form views. This is done to fix a bizarre issue where the resize arrow appears halfway up the textarea

module.exports = async (page) => {
  console.log('Explicitly setting height of textarea field...');
  await page.evaluate(() => {
    const textareas = document.getElementsByTagName('textarea');

    for (let i = 0; i < textareas.length; i += 1) {
      textareas[i].style.height = "120px";
    }
  });
};