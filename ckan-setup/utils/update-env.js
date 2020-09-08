const fs = require('fs');

// Utility function for updating the local .env file.
// ids is an array of ckan ids taken from the appropriate dataset page
// envVars is an array of environment variables to either replace or create in .env
// This method assumes that both arrays are in parallel eg: ids[2] is the correct value for envVars[2]

module.exports = async (page, specifySection = false) => {
    let envVars = [
        'ORGANOGRAM_RESOURCE_NO_SOURCE',
        'ORGANOGRAM_RESOURCE_SOURCE_SPECIFIED',
        'STANDARD_RESOURCE',
    ];
    const envFile = await fs.readFileSync('.env', 'utf-8');
    let envList = envFile.split(/\r?\n/);
    let resourceIds = [];

    if (specifySection) {
        if (specifySection === "organogram") {
            envVars.splice(2, 1);
        } else if (specifySection === "default") {
            envVars.splice(0, 2);
        } else {
            throw new Error("You've passed a specified section for the resource id populator that isn't recognised. Please review the readme and pass in a supported value or nothing.");
        }
    }

    if (!specifySection || specifySection === "organogram") {
        await Promise.all([
            page.goto(`${process.env.DOMAIN}/dataset/organogram-test`),
            page.waitForNavigation()
        ]);

        resourceIds = resourceIds.concat(await page.evaluate(() => [...document.querySelectorAll('.resource-item')].map(resource => resource.dataset.id)));
    }

    if (!specifySection || specifySection === "default") {
        await Promise.all([
            page.goto(`${process.env.DOMAIN}/dataset/example-dataset-number-one`),
            page.waitForNavigation()
        ]);

        resourceIds.push(await page.evaluate(() => document.querySelector('.resource-item').dataset.id));
    }

    for(let i = 0; i < envVars.length; i += 1) {
        const index = envList.findIndex(data => data.indexOf(envVars[i]) !== -1);
        const envVarValue = `${envVars[i]}='${resourceIds[i]}'`;

        if (index !== -1) {
            envList[index] = envVarValue;
        } else {
            envList.push(envVarValue);
        }
    }

    await fs.writeFileSync('.env', envList.join('\r\n'));
}