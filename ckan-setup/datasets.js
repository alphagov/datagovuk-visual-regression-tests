const testDatasetStatus = require('./utils/route-status').dataset;
const updateEnv = require('./utils/update-env');

module.exports = async page => {
    console.log('Verifying test datasets...');

    const datasetList = [
        {
            name: 'Example Dataset #1',
            slug: 'example-dataset-number-one',
        },
        {
            name: 'Example Dataset #1',
            slug: 'example-dataset-number-two',
        },
    ];

    for (let i = 0; i < datasetList.length; i++) {
        if (await testDatasetStatus(page, datasetList[i].slug) === 404) {
            throw new Error('Unable to verify existence of test dataset. Please check that your local instance of docker-ckan is running properly and that the test data task has run as expected and try again.');
        } else {
            console.log(`${datasetList[i].name} verified. `);
        }
    }

    console.log('Retrieving id of first dataset resource... These will be written to your .env file.');

    await updateEnv(page, "default");

    console.log('.env file updated with the resource id.');
};