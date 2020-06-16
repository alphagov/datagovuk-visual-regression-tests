require('dotenv').config();

module.exports = {
  "id": "backstop_data_gov_uk",
  "viewports": [
    {
      "label": "phone",
      "width": 320,
      "height": 480
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
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
    { "label": "Homepage - default", "url": process.env.DOMAIN, "closeAdminToolbar": true },
    { "label": "Dataset - default", "url": `${process.env.DOMAIN}/dataset` },
    { "label": "Dataset - add new", "url": `${process.env.DOMAIN}/dataset/new`, "slugPreview": true },
    { "label": "Dataset - add new: form errors", "url": `${process.env.DOMAIN}/dataset/new`, "submitForm": true },
    { "label": "Dataset - view dataset", "url": `${process.env.DOMAIN}/dataset/example-dataset-number-one`},
    { "label": "Dataset - edit dataset", "url": `${process.env.DOMAIN}/dataset/edit/example-dataset-number-one`, "slugPreview": true},
    { "label": "Dataset - view resources for a dataset", "url": `${process.env.DOMAIN}/dataset/resources/example-dataset-number-one` },
    { "label": "Dataset - add new resource", "url": `${process.env.DOMAIN}/dataset/new_resource/example-dataset-number-one` },
    { "label": "Dataset - view resource", "url": `${process.env.DOMAIN}/dataset/example-dataset-number-one/resource/${process.env.STANDARD_RESOURCE}` },
    { "label": "Dataset - edit resource", "url": `${process.env.DOMAIN}/dataset/example-dataset-number-one/resource_edit/${process.env.STANDARD_RESOURCE}` },
    { "label": "Dataset - edit organogram resource: no source", "url": `${process.env.DOMAIN}/dataset/organogram-test/resource_edit/${process.env.ORGANOGRAM_RESOURCE_NO_SOURCE}`, "uploadField": true },
    { "label": "Dataset - edit organogram resource: source specified", "url": `${process.env.DOMAIN}/dataset/organogram-test/resource_edit/${process.env.ORGANOGRAM_RESOURCE_SOURCE_SPECIFIED}`, "uploadField": true },
    { "label": "Publisher - default", "url": `${process.env.DOMAIN}/publisher` },
    { "label": "Publisher - add new", "url": `${process.env.DOMAIN}/publisher/new`, "uploadField": true, "slugPreview": true },
    { "label": "Publisher - add new: form errors", "url": `${process.env.DOMAIN}/publisher/new`, "submitForm": true, "uploadField": true },
    { "label": "Publisher - view publisher", "url": `${process.env.DOMAIN}/publisher/test-publisher` },
    { "label": "Publisher - edit publisher", "url": `${process.env.DOMAIN}/publisher/edit/test-publisher`, "uploadField": true, "slugPreview": true },
    { "label": "Harvest - default", "url": `${process.env.DOMAIN}/harvest` },
    { "label": "Harvest - add new source", "url": `${process.env.DOMAIN}/harvest/new`, "slugPreview": true },
    { "label": "Harvest - add new source: form errors", "url": `${process.env.DOMAIN}/harvest/new`, "submitForm": true },
    { "label": "Harvest - view source datasets", "url": `${process.env.DOMAIN}/harvest/mock-harvest-source` },
    { "label": "Harvest - view source details", "url": `${process.env.DOMAIN}/harvest/about/mock-harvest-source` },
    { "label": "Harvest - manage source", "url": `${process.env.DOMAIN}/harvest/admin/mock-harvest-source` },
    { "label": "Harvest - last job report for source", "url": `${process.env.DOMAIN}/harvest/mock-harvest-source/job/last` },
    { "label": "Harvest - jobs list for source", "url": `${process.env.DOMAIN}/harvest/mock-harvest-source/job` },
    { "label": "Harvest - edit source", "url": `${process.env.DOMAIN}/harvest/edit/mock-harvest-source`, "slugPreview": true },
    { "label": "User - default", "url": `${process.env.DOMAIN}/user`, "closeAdminToolbar": true },
    { "label": "User - view datasets", "url": `${process.env.DOMAIN}/user/default`, "closeAdminToolbar": true },
    { "label": "User - view activity", "url": `${process.env.DOMAIN}/user/activity/default`, "closeAdminToolbar": true },
    { "label": "User - edit user", "url": `${process.env.DOMAIN}/user/edit/default`, "closeAdminToolbar": true },
    { "label": "User - login", "url": `${process.env.DOMAIN}/user/login`, "skipLogin": true, "closeAdminToolbar": true },
    { "label": "User - login: user already logged in", "url": `${process.env.DOMAIN}/user/login`, "closeAdminToolbar": true },
    { "label": "User - logged out", "url": `${process.env.DOMAIN}/user/logged_out_redirect`, "skipLogin": true, "closeAdminToolbar": true },
    { "label": "User - regster for an account", "url": `${process.env.DOMAIN}/user/regster`, "closeAdminToolbar": true },
    { "label": "Dashboard - default", "url": `${process.env.DOMAIN}/dashboard`, "closeAdminToolbar": true },
    { "label": "Dashboard - datasets", "url": `${process.env.DOMAIN}/dashboard/datasets`, "closeAdminToolbar": true },
    { "label": "Dashboard - organizations", "url": `${process.env.DOMAIN}/dashboard/organizations`, "closeAdminToolbar": true },
    { "label": "Admin - users list", "url": `${process.env.DOMAIN}/ckan-admin`, "closeAdminToolbar": true },
    { "label": "Admin - instance configuration", "url": `${process.env.DOMAIN}/ckan-admin/config`, "closeAdminToolbar": true, "uploadField": true },
    { "label": "Admin - data trash", "url": `${process.env.DOMAIN}/ckan-admin/trash`, "closeAdminToolbar": true },
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
}
