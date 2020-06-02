require('dotenv').config();

exports.publisher = async page => {
    const response = await page.goto(`${process.env.DOMAIN}/publisher/test-publisher`);
    return response.status();
};

exports.harvest = async page => {
    const response = await page.goto(`${process.env.DOMAIN}/harvest/mock-harvest-source`);
    return response.status();
};