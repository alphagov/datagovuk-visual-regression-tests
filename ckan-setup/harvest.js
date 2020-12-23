const testHarvestStatus = require('./utils/route-status').harvest;

module.exports = async page => {
    console.log('Verifying mock harvest source...');

    const harvestSource = {
        name: 'Example Harvest #1',
        slug: 'example-harvest-1',
    };


    if (await testHarvestStatus(page, harvestSource.slug) === 404) {
        throw new Error('Unable to verify existence of mock harvest source after automated creation. Please check that your local instance of docker-ckan is running properly and that the test data task has run as expected and try again.');
    } else {
        console.log('Mock harvest source verified.');
    }

}