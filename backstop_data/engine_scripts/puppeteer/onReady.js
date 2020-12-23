require('dotenv').config();
const login = require('./utils/login');
const removeDebugConsole = require('./utils/remove-debug-console');
const removeUserElements = require('./utils/remove-user-elements');
const submitForm = require('./utils/submit-form');
const uploadField = require('./utils/upload-field');
const select2Field = require('./utils/select2-field');
const slugPreview = require('./utils/slug-preview');
const setTextareaHeight = require('./utils/set-textarea-height');
const tableRows = require('./utils/table-rows');
const removeDashboardElements = require('./utils/remove-dashboard-elements');
const harvestJobList = require('./utils/harvest-job-list');
const tableShowMore = require('./utils/table-show-more');

module.exports = async (page, scenario, vp) => {
    // Set the label string to be used across config scripts
    const label = `${scenario.label}, ${vp.label}`;

    // Will look for attributes from the config scenario JSON to identify which extra scripts to run
    if (!scenario.skipLogin) {
        await login(page, scenario, label);
        await removeUserElements(page);
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

    if (scenario.select2) {
        await select2Field(page);
    }

    if (scenario.slugPreview) {
        await slugPreview(page);
    }

    if (scenario.textarea) {
        await setTextareaHeight(page);
    }

    if (scenario.tableRows) {
        await tableRows(page);
    }

    if (scenario.dashboard) {
        await removeDashboardElements(page);
    }

    if (scenario.harvestJobList) {
        await harvestJobList(page);
    }

    if (scenario.tableShowMore) {
        tableShowMore(page, label);
    }
};