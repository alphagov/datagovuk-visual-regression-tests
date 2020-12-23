require('dotenv').config();
const puppeteer = require('puppeteer');
const login = require('../backstop_data/engine_scripts/puppeteer/utils/login');
const publisher = require('./publisher');
const harvest = require('./harvest');
const datasets = require('./datasets');
const organogram = require('./organogram');
const removeDebugConsole = require('../backstop_data/engine_scripts/puppeteer/utils/remove-debug-console');

// The route of the setup script for the ckan VRT
// This script opperates based on keywords accessed via process.argv, specifically the keywords "publisher", "harvest", "organogram" or "all"

(async () => {
    console.log('Welcome to local data setup for datagovuk visual regression tests. Please ensure that you are running a local instance of docker-ckan and that your environment is clear except for the standard datagovuk test data. Failure to meet these requirements may lead to this script failing and your backstop tests to fail unnecessarily.');
    
    console.log('Preparing puppeteer...');

    // Start puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Need to be logged in to add new data
        await login(page, {url: `${process.env.DOMAIN}`}, 'data setup');

        // The debug toolbar prevents certain actions from being carried out when open. This action closes it for the duration of the setup
        await removeDebugConsole(page);

        await publisher(page);
        await harvest(page);
        await datasets(page);
        await organogram(page);

    } catch(e) {
        // This and the browser.close() statement below, outside the try catch, ensure that the puppeteer session always ends. Otherwise the cli will hang until it times out, eating into machine memory
        await browser.close();
        console.log(e);
    }

    await browser.close();
})();