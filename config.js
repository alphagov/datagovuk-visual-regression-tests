function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

var environment = capitalize(process.env.DGU_ENVIRONMENT || 'development')
var domain = process.env.DG_DOMAIN || 'https://ckan.publishing.service.gov.uk'

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
  "scenarios": [
    { "label": environment + ": Homepage", "url": domain },
    { "label": environment + ": Datasets", "url": `${domain}/dataset` },
    { "label": environment + ": Specific publisher selected", "url": `${domain}/publisher/b1472b4f-b8c8-4ac2-9701-76995445f99b?tags=OpenData&tags=Land+use` },
    { "label": environment + ": Specific page viewed", "url": `${domain}/dataset/national-historic-landscape-characterisation-250m-grid-england` },
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts/puppeteer",
    "html_report": "backstop_data/html_report"
  },
  "report": [],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"],
  },
  "debug": false,
  "debugWindow": false
}
