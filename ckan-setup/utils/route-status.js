// A module set for getting the status of the expected routes.
// Returns the status method produced by puppeteers goto() class, which can then be used to check the validity of a route through status codes eg: 200 for success, 404 for doesn't exist

const getStatus = async (page, route) => {
    const response = await page.goto(`${process.env.DOMAIN}/${route}`);
    return response.status();
}

exports.publisher = async page => await getStatus(page, 'publisher/test-publisher');
exports.harvest = async page => await getStatus(page, 'harvest/mock-harvest-source');
exports.datasetStandard = async page => await getStatus(page, 'dataset/example-dataset-number-one');
exports.datasetOrganogram = async page => await getStatus(page, 'dataset/organogram-test');