const testPublisherStatus = require('./utils/route-status').publisher;

module.exports = async page => {
    console.log('Creating a test publisher...');

    if (await testPublisherStatus(page) === 404) {
        await Promise.all([
            page.goto(`${process.env.DOMAIN}/publisher/new`),
            page.waitForNavigation() 
        ]);

        await page.evaluate(() => {
            document.getElementById('field-name').value = 'Test publisher';
            document.getElementById('field-url').value = 'test-publisher';
            document.getElementById('field-description').value = 'Test publisher';
        });

        await Promise.all([
            page.click('button[type="submit"]'),
            page.waitForNavigation()
        ]);

        console.log('Checking successful test publisher generation...');

        if (await testPublisherStatus(page) === 200) {
            console.log('Test publisher created successfully!');
        } else {
            throw new Error('Unable to verify existence of test publisher after automated creation. Please check that your local instance of docker-ckan is running properly and try again.');
        }
    } else {
        console.log('Test publisher already exists! Skipping publisher generation');
    }
};