const backstop = require('backstopjs');

(async () => {
    const config = process.argv[2] ? process.argv[2] : '2.7';

    console.log(`You are about to approve the most recently run tests for data.gov.uk: ${config}. Please remember that the approval process will only run against the most recently run tests, including filters eg: if you just ran a 2.8 homepage test, only those homepage tests will be approved for the 2.8 config list.`);

    await backstop('approve', {
        config: `configs/${config}.js`
    });
})();