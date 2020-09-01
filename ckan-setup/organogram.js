const testDatasetStatus = require('./utils/route-status').dataset;
const waitForOrganogramJS = require('../backstop_data/engine_scripts/puppeteer/utils/upload-field');
const updateEnv = require('./utils/update-env');

module.exports = async page => {
    console.log('Creating organogram dataset...');

    const organogramData = {
        name: 'Organogram test',
        slug: 'organogram-test'
    };

    if (await testDatasetStatus(page, organogramData.slug) === 404) {
        await Promise.all([
           page.goto(`${process.env.DOMAIN}/dataset/new`),
           page.waitForNavigation() 
        ]);

        await page.evaluate(organogramData => {
            document.getElementById('field-title').value = organogramData.name;
            document.getElementById('field-name').value = organogramData.slug;
            document.getElementById('field-notes').value = organogramData.name;

            const schemaDropdown = document.getElementById('field-schema-vocabulary');
            schemaDropdown.value = [...schemaDropdown.options].find(opt => opt.text.indexOf('Organisation structure') !== -1).value;
        }, organogramData);

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

        await waitForOrganogramJS(page);

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

        if (await testDatasetStatus(page, organogramData.slug) === 200) {
            console.log('Organogram dataset created successfully!');
        } else {
            throw new Error('Unable to verify existence of organogram dataset after automated creation. Please check that your local instance of docker-ckan is running properly and try again.');
        }
    } else {
        console.log('Organogram dataset and resources already exist! Skipping dataset generation');
    }

    console.log('Retrieving ids of organogram dataset resources... These will be written to your .env file.');

    await updateEnv(page, "organogram");

    console.log('.env file updated with ids of organogram resources. Organogram dataset setup is complete!');
}