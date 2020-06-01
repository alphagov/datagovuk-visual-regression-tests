require('dotenv').config();
const puppeteer = require('puppeteer');
const login = require('../backstop_data/engine_scripts/puppeteer/utils/login');

(async () => {
    console.log('Welcome to local data setup for datagovuk visual regression tests. Please ensure that you are running a local instance of docker-ckan and that your environment is clear. Failure to meet these requirements may lead to this script failing and your tests to fail unecessarily.');
    console.log('Preparing puppeteer...')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await login(page, {url: `${process.env.DOMAIN}`}, 'data setup');

    await browser.close();
})();