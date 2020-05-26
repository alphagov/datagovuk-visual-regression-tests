require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';

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
  "onReadyScript": "login",
  "scenarios": [
    { "label": environment + ": Homepage", "url": process.env.DOMAIN },
    { "label": environment + ": Datasets", "url": `${process.env.DOMAIN}/dataset` },
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
