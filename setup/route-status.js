require('dotenv').config();

const getStatus = async (page, route) => {
    const response = await page.goto(`${process.env.DOMAIN}/${route}`);
    return response.status();
}

exports.publisher = async page => await getStatus(page, 'publisher/test-publisher') ;
exports.harvest = async page => await getStatus(page, 'harvest/mock-harvest-source') ;
exports.datasetStandard = async page => await getStatus(page, 'dataset/example-dataset-number-one') ;
