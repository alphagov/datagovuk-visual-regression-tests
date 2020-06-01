const clearCookies = require('./utils/clear-cookies');

module.exports = (page, scenario, vp) => {
    const label = `${scenario.label}, ${vp.label}`;
    clearCookies(page, scenario, label);
};