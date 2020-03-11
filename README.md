![Node.js CI](https://github.com/alphagov/datagovuk-visual-regression-tests/workflows/Node.js%20CI/badge.svg)

# DATA.GOV.UK - Visual Regression Testing
This repo contains configuration for BackstopJS.

## Credits
This repo is a fork of the work done by the Digital Marketplace team (https://github.com/alphagov/digitalmarketplace-visual-regression)

## Setup
You'll need the data.gov.uk running locally with the nginx magic applied so routes join up under http://localhost

You'll also need node installed locally.

Clone this repo and run:
`npm install`
`npm run approve` # for first time only

## Running tests locally
Simply run:
`npm run test`

With the basic setup as supplied, this will run an initial test on your localhost.  Everything will fail because you don't have any reference screenshots.  To get some references, simply approve your test run:

`npm run approve`

Now you can happily change your local apps and run tests (with `npm run test`) to make sure you've not broken things!  Everytime you do a good change, simply `npm run approve` to update your reference screenshots.

## Updating tests
To add new test scenarios, update `config.js` under the `scenarios` key and follow the format of other entries in the list. If you're updating existing scenarios to fix a test failure as part of your pipeline, you should use the pipeline popup menu to re-run visual regression tests and then approve them. If you're adding new tests, you'll probably want to run the visual regression tests directly (i.e. not as part of a release pipeline) through the Jenkins job (using 'Build with parameters') and then approve them manually as well. Make sure to review the test report before approving to check nothing else has slipped in, and ensure no-one else triggers a test run between your test and approval.
