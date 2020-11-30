const testPublisherStatus = require('./utils/route-status').publisher;

module.exports = async page => {
    console.log('Verifying test publishers...');

    const publisherList = [
        {
            name: 'Example Publisher #1',
            slug: 'example-publisher-1',
        },
        {
            name: 'Example Publisher #2',
            slug: 'example-publisher-2',
        },
    ];

    for (let i = 0; i < publisherList.length; i++) {
        if (await testPublisherStatus(page, publisherList[i].slug) === 404) {
            throw new Error('Unable to verify existence of test publisher. Please check that your local instance of docker-ckan is running properly and that the test data task has run as expected and try again.');
        } else {
            console.log(`${publisherList[i].name} verified.`);
        }
    }
};