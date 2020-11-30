require('dotenv').config();
const login = require('./utils/login');
const removeDebugConsole = require('./utils/remove-debug-console');
const submitForm = require('./utils/submit-form');
const uploadField = require('./utils/upload-field');
const slugPreview = require('./utils/slug-preview');

module.exports = async (page, scenario, vp) => {
    // Set the label string to be used across config scripts
    const label = `${scenario.label}, ${vp.label}`;

    // Will look for attributes from the config scenario JSON to identify which extra scripts to run
    if (!scenario.skipLogin) {
        await login(page, scenario, label);
    } else {
        console.log(`Login will be skipped for scenario ${label}`);
    }

    await removeDebugConsole(page);

    if (scenario.submitForm) {
        await submitForm(page, label);
    }

    if (scenario.uploadField) {
        await uploadField(page);
    }

    if (scenario.slugPreview) {
        await slugPreview(page);
    }
};