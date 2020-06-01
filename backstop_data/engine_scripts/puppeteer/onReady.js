require('dotenv').config();
const login = require('./utils/login');
const closeAdminToolbar = require('./utils/close-admin-toolbar');
const submitForm = require('./utils/submit-form');
const organogram = require('./utils/organogram');

module.exports = async (page, scenario, vp) => {
    const label = `${scenario.label}, ${vp.label}`;

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