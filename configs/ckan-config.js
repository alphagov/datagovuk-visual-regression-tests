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
        { "label": "Homepage - default", "url": process.env.DOMAIN, "hideSelectors": [".flash-messages"] },
        { "label": "Dataset - default", "url": `${process.env.DOMAIN}/dataset` },
        { "label": "Dataset - add new", "url": `${process.env.DOMAIN}/dataset/new`, "slugPreview": true, "textarea": true, "select2": true },
        { "label": "Dataset - add new: form errors", "url": `${process.env.DOMAIN}/dataset/new`, "submitForm": true, "textarea": true, "select2": true },
        { "label": "Dataset - view dataset", "url": `${process.env.DOMAIN}/dataset/example-dataset-number-one`, "hideSelectors": ["table.table td:nth-child(2)"], "tableRows": true },
        { "label": "Dataset - edit dataset", "url": `${process.env.DOMAIN}/dataset/edit/example-dataset-number-one`, "slugPreview": true, "textarea": true, "select2": true },
        { "label": "Dataset - view resources for a dataset", "url": `${process.env.DOMAIN}/dataset/resources/example-dataset-number-one`, "hideSelectors": ["table.table td:nth-child(2)"], "tableRows": true },
        { "label": "Dataset - add new resource", "url": `${process.env.DOMAIN}/dataset/new_resource/example-dataset-number-one`, "select2": true },
        { "label": "Dataset - view resource", "url": `${process.env.DOMAIN}/dataset/example-dataset-number-one/resource/${process.env.STANDARD_RESOURCE}`, "hideSelectors": ["table.table td:nth-child(2)"], "tableRows": true, "tableShowMore": true},
        { "label": "Dataset - edit resource", "url": `${process.env.DOMAIN}/dataset/example-dataset-number-one/resource_edit/${process.env.STANDARD_RESOURCE}`, "select2": true },
        { "label": "Dataset - edit organogram resource: no source", "url": `${process.env.DOMAIN}/dataset/organogram-test/resource_edit/${process.env.ORGANOGRAM_RESOURCE_NO_SOURCE}`, "uploadField": true, "select2": true },
        { "label": "Dataset - edit organogram resource: source specified", "url": `${process.env.DOMAIN}/dataset/organogram-test/resource_edit/${process.env.ORGANOGRAM_RESOURCE_SOURCE_SPECIFIED}`, "uploadField": true, "select2": true },
        { "label": "Publisher - default", "url": `${process.env.DOMAIN}/${id === "ckan-2.9" ? "organization" : "publisher"}` },
        { "label": "Publisher - add new", "url": `${process.env.DOMAIN}/${id === "ckan-2.9" ? "organization" : "publisher"}/new`, "slugPreview": true, "textarea": true },
        { "label": "Publisher - add new: form errors", "url": `${process.env.DOMAIN}/${id === "ckan-2.9" ? "organization" : "publisher"}/new`, "submitForm": true, "textarea": true },
        { "label": "Publisher - view publisher", "url": `${process.env.DOMAIN}/${id === "ckan-2.9" ? "organization" : "publisher"}/example-publisher-1` },
        { "label": "Publisher - edit publisher", "url": `${process.env.DOMAIN}/${id === "ckan-2.9" ? "organization" : "publisher"}/edit/example-publisher-1`, "slugPreview": true },
        { "label": "Harvest - default", "url": `${process.env.DOMAIN}/harvest` },
        { "label": "Harvest - add new source", "url": `${process.env.DOMAIN}/harvest/new`, "slugPreview": true, "textarea": true, "select2": true },
        { "label": "Harvest - add new source: form errors", "url": `${process.env.DOMAIN}/harvest/new`, "submitForm": true, "textarea": true, "select2": true },
        { "label": "Harvest - view source datasets", "url": `${process.env.DOMAIN}/harvest/example-harvest-1` },
        { "label": "Harvest - view source details", "url": `${process.env.DOMAIN}/harvest/about/example-harvest-1`, "hideSelectors": ["table.table td:nth-child(2)"], "tableRows": true },
        { "label": "Harvest - manage source", "url": `${process.env.DOMAIN}/harvest/admin/example-harvest-1`, "hideSelectors": ["table.table td:nth-child(2)"], "tableRows": true },
        { "label": "Harvest - last job report for source", "url": `${process.env.DOMAIN}/harvest/example-harvest-1/job/last`, "hideSelectors": [".dataset-list", "table.table td:nth-child(2)"], "tableRows": true },
        { "label": "Harvest - jobs list for source", "url": `${process.env.DOMAIN}/harvest/example-harvest-1/job`, "harvestJobList": true },
        { "label": "Harvest - edit source", "url": `${process.env.DOMAIN}/harvest/edit/example-harvest-1`, "slugPreview": true, "textarea": true, "select2": true },
        { "label": "User - default", "url": `${process.env.DOMAIN}/user`, "hideSelectors": [".user-list"] },
        { "label": "User - view datasets", "url": `${process.env.DOMAIN}/user/default`, "hideSelectors": ["dd"] },
        { "label": "User - view activity", "url": `${process.env.DOMAIN}/user/activity/default`, "hideSelectors": ["dd"], "dashboard": true },
        { "label": "User - edit user", "url": `${process.env.DOMAIN}/user/edit/default`, "textarea": true },
        { "label": "User - login", "url": `${process.env.DOMAIN}/user/login`, "skipLogin": true },
        { "label": "User - login: user already logged in", "url": `${process.env.DOMAIN}/user/login` },
        { "label": "User - logged out", "url": `${process.env.DOMAIN}/user/logged_out_redirect`, "skipLogin": true },
        { "label": "User - register for an account", "url": `${process.env.DOMAIN}/user/register` },
        { "label": "Dashboard - default", "url": `${process.env.DOMAIN}/dashboard`, "dashboard": true },
        { "label": "Dashboard - datasets", "url": `${process.env.DOMAIN}/dashboard/datasets` },
        { "label": "Dashboard - organizations", "url": `${process.env.DOMAIN}/dashboard/organizations` },
        { "label": "Admin - users list", "url": `${process.env.DOMAIN}/ckan-admin`, "hideSelectors": [".user-list"] },
        { "label": "Admin - instance configuration", "url": `${process.env.DOMAIN}/ckan-admin/config`, "uploadField": true, "textarea": true },
        { "label": "Admin - data trash", "url": `${process.env.DOMAIN}/ckan-admin/trash` },
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