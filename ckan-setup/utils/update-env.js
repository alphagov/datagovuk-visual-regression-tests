const fs = require('fs');

// Utility function for updating the local .env file.
// ids is an array of ckan ids taken from the appropriate dataset page
// envVars is an array of environment variables to either replace or create in .env
// This method assumes that both arrays are in parallel eg: ids[2] is the correct value for envVars[2]

module.exports = async (ids, envVars) => {
    const envFile = await fs.readFileSync('.env', 'utf-8');
    let envList = envFile.split(/\r?\n/);

    for(let i = 0; i < envVars.length; i += 1) {
        const index = envList.findIndex(data => data.indexOf(envVars[i]) !== -1);
        const envVarValue = `${envVars[i]}='${ids[i]}'`;

        if (index !== -1) {
            envList[index] = envVarValue;
        } else {
            envList.push(envVarValue);
        }
    }

    await fs.writeFileSync('.env', envList.join('\r\n'));
}