const clearCookies = require('./utils/clear-cookies');

module.exports = (page, scenario, vp) => {
    // Set the label string to be used across config scripts
    const label = `${scenario.label}, ${vp.label}`;
    clearCookies(page, scenario, label);
};