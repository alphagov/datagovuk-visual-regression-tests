module.exports = id => ({
    "id": id,
    "viewports": [
        {
        "label": "phone",
        "width": 320,
        "height": 480
        },
        {
        "label": "tablet",
        "width": 768,
        "height": 1024
        },
        {
        "label": "desktop",
        "width": 1366,
        "height": 768
        }
    ],
    "misMatchThreshold": 0,
    "requireSameDimensions": false,
    "onBeforeScript": "onBefore.js",
    "onReadyScript": "onReady.js",
    "scenarios": [
        { "label": "Homepage - default", "url": process.env.DOMAIN, "hideSelectors": [".gravatar", ".username", "#flDebug"] },
        { "label": "Dataset - default", "url": `${process.env.DOMAIN}/dataset`, "hideSelectors": [".gravatar", ".username"] },
        { "label": "Dataset - add new", "url": `${process.env.DOMAIN}/dataset/new`, "hideSelectors": [".gravatar", ".username"], "slugPreview": true },
        { "label": "Dataset - add new: form errors", "url": `${process.env.DOMAIN}/dataset/new`, "hideSelectors": [".gravatar", ".username"], "submitForm": true },
        { "label": "Dataset - view dataset", "url": `${process.env.DOMAIN}/dataset/example-dataset-number-one`, "hideSelectors": [".gravatar", ".username", "table.table td:nth-child(2)"]},
        { "label": "Dataset - edit dataset", "url": `${process.env.DOMAIN}/dataset/edit/example-dataset-number-one`, "hideSelectors": [".gravatar", ".username"], "slugPreview": true},
        { "label": "Dataset - view resources for a dataset", "url": `${process.env.DOMAIN}/dataset/resources/example-dataset-number-one`, "hideSelectors": [".gravatar", ".username", "table.table td:nth-child(2)"] },
        { "label": "Dataset - add new resource", "url": `${process.env.DOMAIN}/dataset/new_resource/example-dataset-number-one`, "hideSelectors": [".gravatar", ".username"] },
        { "label": "Dataset - view resource", "url": `${process.env.DOMAIN}/dataset/example-dataset-number-one/resource/${process.env.STANDARD_RESOURCE}`, "hideSelectors": [".gravatar", ".username", "table.table td:nth-child(2)"] },
        { "label": "Dataset - edit resource", "url": `${process.env.DOMAIN}/dataset/example-dataset-number-one/resource_edit/${process.env.STANDARD_RESOURCE}`, "hideSelectors": [".gravatar", ".username"] },
        { "label": "Dataset - edit organogram resource: no source", "url": `${process.env.DOMAIN}/dataset/organogram-test/resource_edit/${process.env.ORGANOGRAM_RESOURCE_NO_SOURCE}`, "hideSelectors": [".gravatar", ".username"], "uploadField": true },
        { "label": "Dataset - edit organogram resource: source specified", "url": `${process.env.DOMAIN}/dataset/organogram-test/resource_edit/${process.env.ORGANOGRAM_RESOURCE_SOURCE_SPECIFIED}`, "hideSelectors": [".gravatar", ".username"], "uploadField": true },
        { "label": "Publisher - default", "url": `${process.env.DOMAIN}/publisher`, "hideSelectors": [".gravatar", ".username"] },
        { "label": "Publisher - add new", "url": `${process.env.DOMAIN}/publisher/new`, "hideSelectors": [".gravatar", ".username"], "uploadField": true, "slugPreview": true },
        { "label": "Publisher - add new: form errors", "url": `${process.env.DOMAIN}/publisher/new`, "hideSelectors": [".gravatar", ".username"], "submitForm": true, "uploadField": true },
        { "label": "Publisher - view publisher", "url": `${process.env.DOMAIN}/publisher/example-publisher-1`, "hideSelectors": [".gravatar", ".username"] },
        { "label": "Publisher - edit publisher", "url": `${process.env.DOMAIN}/publisher/edit/example-publisher-1`, "hideSelectors": [".gravatar", ".username"], "uploadField": true, "slugPreview": true },
        { "label": "Harvest - default", "url": `${process.env.DOMAIN}/harvest`, "hideSelectors": [".gravatar", ".username"] },
        { "label": "Harvest - add new source", "url": `${process.env.DOMAIN}/harvest/new`, "hideSelectors": [".gravatar", ".username"], "slugPreview": true },
        { "label": "Harvest - add new source: form errors", "url": `${process.env.DOMAIN}/harvest/new`, "hideSelectors": [".gravatar", ".username"], "submitForm": true },
        { "label": "Harvest - view source datasets", "url": `${process.env.DOMAIN}/harvest/example-harvest-1`, "hideSelectors": [".gravatar", ".username"] },
        { "label": "Harvest - view source details", "url": `${process.env.DOMAIN}/harvest/about/example-harvest-1`, "hideSelectors": [".gravatar", ".username", "table.table td:nth-child(2)"] },
        { "label": "Harvest - manage source", "url": `${process.env.DOMAIN}/harvest/admin/example-harvest-1`, "hideSelectors": [".gravatar", ".username", "table.table td:nth-child(2)"] },
        { "label": "Harvest - last job report for source", "url": `${process.env.DOMAIN}/harvest/example-harvest-1/job/last`, "hideSelectors": [".gravatar", ".username", ".dataset-list", "table.table td:nth-child(2)"] },
        { "label": "Harvest - jobs list for source", "url": `${process.env.DOMAIN}/harvest/example-harvest-1/job`, "hideSelectors": [".gravatar", ".username", ".dataset-heading", ".automatic-local-datetime"] },
        { "label": "Harvest - edit source", "url": `${process.env.DOMAIN}/harvest/edit/example-harvest-1`, "hideSelectors": [".gravatar", ".username"], "slugPreview": true },
        { "label": "User - default", "url": `${process.env.DOMAIN}/user`, "hideSelectors": [".gravatar", ".username", "#flDebug", ".user-list"] },
        { "label": "User - view datasets", "url": `${process.env.DOMAIN}/user/default`, "hideSelectors": [".gravatar", ".username", "#flDebug", "dd"] },
        { "label": "User - view activity", "url": `${process.env.DOMAIN}/user/activity/default`, "hideSelectors": [".gravatar", ".username", "#flDebug", "dd", ".date"] },
        { "label": "User - edit user", "url": `${process.env.DOMAIN}/user/edit/default`, "hideSelectors": [".gravatar", ".username", "#flDebug"] },
        { "label": "User - login", "url": `${process.env.DOMAIN}/user/login`, "hideSelectors": [".gravatar", ".username", "#flDebug"], "skipLogin": true },
        { "label": "User - login: user already logged in", "url": `${process.env.DOMAIN}/user/login`, "hideSelectors": [".gravatar", ".username", "#flDebug"] },
        { "label": "User - logged out", "url": `${process.env.DOMAIN}/user/logged_out_redirect`, "hideSelectors": [".gravatar", ".username", "#flDebug"], "skipLogin": true },
        { "label": "User - register for an account", "url": `${process.env.DOMAIN}/user/register`, "hideSelectors": [".gravatar", ".username", "#flDebug"] },
        { "label": "Dashboard - default", "url": `${process.env.DOMAIN}/dashboard`, "hideSelectors": [".gravatar", ".username", "#flDebug", ".actor", ".date"] },
        { "label": "Dashboard - datasets", "url": `${process.env.DOMAIN}/dashboard/datasets`, "hideSelectors": [".gravatar", ".username", "#flDebug"] },
        { "label": "Dashboard - organizations", "url": `${process.env.DOMAIN}/dashboard/organizations`, "hideSelectors": [".gravatar", ".username", "#flDebug"] },
        { "label": "Admin - users list", "url": `${process.env.DOMAIN}/ckan-admin`, "hideSelectors": [".gravatar", ".username", "#flDebug", ".user-list"] },
        { "label": "Admin - instance configuration", "url": `${process.env.DOMAIN}/ckan-admin/config`, "hideSelectors": [".gravatar", ".username", "#flDebug"], "uploadField": true },
        { "label": "Admin - data trash", "url": `${process.env.DOMAIN}/ckan-admin/trash`, "hideSelectors": [".gravatar", ".username", "#flDebug"] },
    ],
    "paths": {
        "bitmaps_reference": "./backstop_data/bitmaps_reference",
        "bitmaps_test": "./backstop_data/bitmaps_test",
        "engine_scripts": "./backstop_data/engine_scripts/puppeteer",
        "html_report": "./backstop_data/html_report"
    },
    "report": [],
    "engine": "puppeteer",
    "engineOptions": {
        "args": ["--no-sandbox"],
    },
    "debug": false,
    "debugWindow": false
})  