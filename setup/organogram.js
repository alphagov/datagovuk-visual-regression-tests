const testDatasetStatus = require('./utils/route-status').datasetOrganogram;
const waitForORganogramJS = require('../backstop_data/engine_scripts/puppeteer/utils/organogram');
const updateEnv = require('./utils/update-env');

module.exports = async page => {
    console.log('Creating organogram dataset...');

    if (await testDatasetStatus(page) === 404) {
        await Promise.all([
           page.goto(`${process.env.DOMAIN}/dataset/new`),
           page.waitForNavigation() 
        ]);

        await page.evaluate(() => {
            document.getElementById('field-title').value = 'Organogram test';
            document.getElementById('field-name').value = 'organogram-test';
            document.getElementById('field-notes').value = 'Organogram test';

            const schemaDropdown = document.getElementById('field-schema-vocabulary');
            schemaDropdown.value = [...schemaDropdown.options].find(opt => opt.text.indexOf('Organisation structure') !== -1).value;
        });

        await Promise.all([
            page.click('button[type="submit"]'),
            page.waitForNavigation()
        ]);

        console.log('Adding resource without a source...');

        await page.evaluate(() => {
            document.getElementById('field-name').value = 'No source';
        });

        await Promise.all([
            page.click('button[value="again"]'),
            page.waitForNavigation()
        ]);

        console.log('Adding resource with a source...');

        await waitForORganogramJS(page);

        await page.evaluate(() => {
            document.getElementById('field-name').value = 'Source specified';
            document.getElementById('field-image-url').value = 'https://ckan-static-mock-harvest-source.cloudapps.digital/mock-third-party/example-dataset-1/all-categories-summary.csv';
        });

        await page.click('.select2-choice');
        await page.keyboard.type('csv');
        await page.keyboard.press('Enter');

        await Promise.all([
            page.click('button[value="go-metadata"]'),
            page.waitForNavigation()
        ]);

        console.log('Checking successful organogram generation...');

        if (await testDatasetStatus(page) === 200) {
            console.log('Organogram dataset created successfully!');
        } else {
            throw new Error('Unable to verify existence of organogram dataset after automated creation. Please check that your local instance of docker-ckan is running properly and try again.');
        }
    } else {
        console.log('Organogram dataset and resources already exist! Skipping dataset generation');
    }

    console.log('Retreiving ids of organogram dataset resources... These will be written to your .env file.');

    await Promise.all([
        page.goto(`${process.env.DOMAIN}/dataset/organogram-test`),
        page.waitForNavigation()
    ]);

    const ids = await page.evaluate(() => [...document.querySelectorAll('.resource-item')].map(resource => resource.dataset.id));
    await updateEnv(ids, ['ORGANOGRAM_RESOURCE_NO_SOURCE', 'ORGANOGRAM_RESOURCE_SOURCE_SPECIFIED']);

    console.log('.env file updated with ids of organogram resources. Organogram dataset setup is complete!');
}