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
      "height": 768,
      "width": 1024
    },
    {
      "label": "desktop",
      "width": 1366,
      "height": 768
    }
  ],
  "misMatchThreshold": 0,
  "requireSameDimensions": false,
  "onReadyScript": "utils/login.js",
  "scenarios": [
    { "label": "homepage", "url": process.env.DOMAIN, "onReadyScript": "homepage.js" },
    { "label": "datasets", "url": `${process.env.DOMAIN}/dataset` },
    { "label": "add new dataset", "url": `${process.env.DOMAIN}/dataset/new` },
    { "label": "add new dataset: form errors", "url": `${process.env.DOMAIN}/dataset/new`, "onReadyScript": "utils/form-errors.js" },
    { "label": "view dataset", "url": `${process.env.DOMAIN}/dataset/example-dataset-number-one`},
    { "label": "edit dataset", "url": `${process.env.DOMAIN}/dataset/edit/example-dataset-number-one`},
    { "label": "view resources for a dataset", "url": `${process.env.DOMAIN}/dataset/resources/example-dataset-number-one` },
    { "label": "add new resource", "url": `${process.env.DOMAIN}/dataset/new_resource/example-dataset-number-one` },
    { "label": "view resource", "url": `${process.env.DOMAIN}/dataset/example-dataset-number-one/resource/1c217a07-21f1-4e98-b4fa-f9d6009f4151` },
    { "label": "edit resource", "url": `${process.env.DOMAIN}/dataset/example-dataset-number-one/resource_edit/1c217a07-21f1-4e98-b4fa-f9d6009f4151` },
    { "label": "edit organogram resource: no source", "url": `${process.env.DOMAIN}/dataset/organogram-test/resource_edit/f2486156-97f3-4230-a882-1f8912521875`, "onReadyScript": "dataset/organogram.js" },
    { "label": "edit organogram resource: source specified", "url": `${process.env.DOMAIN}/dataset/organogram-test/resource_edit/9456cb97-17f5-4088-a657-7a5d496aef21`, "onReadyScript": "dataset/organogram.js" },
    { "label": "publishers", "url": `${process.env.DOMAIN}/publisher` },
    { "label": "add new publisher", "url": `${process.env.DOMAIN}/publisher/new` },
    { "label": "add new publisher: form errors", "url": `${process.env.DOMAIN}/publisher/new`, "onReadyScript": "utils/form-errors.js" },
    { "label": "view publisher", "url": `${process.env.DOMAIN}/publisher/test-publisher` },
    { "label": "edit publisher", "url": `${process.env.DOMAIN}/publisher/edit/test-publisher` },
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
