require('dotenv').config();
const login = require('./utils/login');
const closeAdminToolbar = require('./utils/close-admin-toolbar');
const submitForm = require('./utils/submit-form');
const organogram = require('./utils/organogram');

module.exports = async (page, scenario, vp) => {
    // Set the label string to be used across config scripts
    const label = `${scenario.label}, ${vp.label}`;

    // Will look for attributes from the config scenario JSON to identify which extra scripts to run
    if (!scenario.skipLogin) {
        await login(page, scenario, label);
    } else {
        console.log(`Login will be skipped for scenario ${label}`);
    }

    if (scenario.closeAdminToolbar) {
        await closeAdminToolbar(page);
    }

    if (scenario.submitForm) {
        await submitForm(page, label);
    }

    if (scenario.organogram) {
        await organogram(page);
    }
};