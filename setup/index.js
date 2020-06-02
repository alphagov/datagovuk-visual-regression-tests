require('dotenv').config();
const puppeteer = require('puppeteer');
const login = require('../backstop_data/engine_scripts/puppeteer/utils/login');
const publisher = require('./publisher');
const harvest = require('./harvest');

(async () => {
    console.log('Welcome to local data setup for datagovuk visual regression tests. Please ensure that you are running a local instance of docker-ckan and that your environment is clear. Failure to meet these requirements may lead to this script failing and your backstop tests to fail unecessarily.');
    
    console.log('Preparing puppeteer...');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        if (process.argv.length < 3) {
            throw new Error('Error: You need to pass either "all" or a relevant keyword to this setup script so that it knows which setup scripts to run.');
        }

        await login(page, {url: `${process.env.DOMAIN}`}, 'data setup');

        if (process.argv.indexOf('publisher') !== -1 || process.argv.indexOf('all') !== -1) {
            await publisher(page);
        }

        if (process.argv.indexOf('harvest') !== -1 || process.argv.indexOf('all') !== -1) {
            await harvest(page);
        }
    } catch(e) {
        await browser.close();
        throw new Error(e);
    }

    await browser.close();
})();