module.exports = async page => {
    const testPublisherStatus = async () => {
        const response = await page.goto(`${process.env.DOMAIN}/publisher/test-publisher`);
        return response.status();
    }

    console.log('Creating a test publisher...');

    if (await testPublisherStatus() === 404) {
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

        if (await testPublisherStatus() === 200) {
            console.log('Test publisher created successfully!');
        } else {
            throw new Error('Unable to verify existence of test publisher after automated creation. Please check that your local instance of docker-ckan is running properly and try again.');
        }
    } else {
        console.log('Test publisher already exists! Skipping publisher generation');
    }
};