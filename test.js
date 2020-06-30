require('dotenv').config();
const backstop = require('backstopjs');

(async () => {
    const config = process.argv[2] ? process.argv[2] : '2.7';
    const filter = process.argv[3] ? `${process.argv[3].charAt(0).toUpperCase()}${process.argv[3].slice(1)} - .*` : false;

    console.log(`You are about to run tests for data.gov.uk: ${config} with ${process.argv[3] ? `the scenario filter: ${process.argv[3]}`: 'no scenario filter'}. Please ensure that the instance you are testing against lines up with the test id you have passed eg: if you are running against a ckan 2.8 instance, don't test against the 2.7 scenario set (unless you explicitly want to do this). If you run into problems whilst testing, please assess the readme or open an issue/pull request in the datagovuk-visual-regression-tests repo.`);

    await backstop('test', {
        config: `configs/${config}.js`,
        filter
    });
})();