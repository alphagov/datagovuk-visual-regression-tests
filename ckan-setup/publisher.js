const testPublisherStatus = require('./utils/route-status').publisher;

module.exports = async page => {
    console.log('Creating test publishers...');

    const publisherList = [
        {
            name: 'Test Publisher #1',
            slug: 'test-publisher-1',
            isCharity: true
        },
        {
            name: 'Test Publisher #2',
            slug: 'test-publisher-2',
            isCharity: false
        },
    ];

    for (let i = 0; i < publisherList.length; i++) {
        if (await testPublisherStatus(page, publisherList[i].slug) === 404) {
            console.log(`Creating ${publisherList[i].name}`);

            await Promise.all([
                page.goto(`${process.env.DOMAIN}/publisher/new`),
                page.waitForNavigation() 
            ]);
    
            await page.evaluate(pubData => {
                document.getElementById('field-name').value = pubData.name;
                document.getElementById('field-url').value = pubData.slug;
                document.getElementById('field-description').value = pubData.name;

                if (pubData.isCharity) {
                    document.getElementById('category').value = 'charity-ngo';
                }
            }, publisherList[i]);
    
            await Promise.all([
                page.click('button[type="submit"]'),
                page.waitForNavigation()
            ]);
    
            console.log('Checking successful publisher generation...');
    
            if (await testPublisherStatus(page, publisherList[i].slug) === 200) {
                console.log(`${publisherList[i].name} created successfully!`);
            } else {
                throw new Error('Unable to verify existence of test publisher after automated creation. Please check that your local instance of docker-ckan is running properly and try again.');
            }
        } else {
            console.log('Test publisher already exists! Skipping publisher generation');
        }
    }
};