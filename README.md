![Node.js CI](https://github.com/alphagov/datagovuk-visual-regression-tests/workflows/Node.js%20CI/badge.svg)

# DATA.GOV.UK - Visual Regression Testing
This repo contains the BackstopJS configuration in order to run visual regression tests for the [data.gov.uk admin panel](https://ckan.publishing.service.gov.uk/).

## Credits
This repo is a fork of the work done by the [Digital Marketplace team](https://github.com/alphagov/digitalmarketplace-visual-regression)

## Setup
Ensure that you have node and NPM installed locally.

Clone this repo and run:

```
npm install
```

Clone the `.env.example` file and create a `.env` file at the root of your local repo. Fill in the environment variables in accordance with their descriptions in `.env.example`.

## How it works
BackstopJS runs through scenarios specified in the config.js file at the project root that specifically relate to the admin journeys in ckan. The intent of these tests is to monitor changes between versions of ckan to ensure that the admin frontend hadn't broken. If these admin journeys change at any point, the scenarios in this tool will need to be reviewed.

## Running tests locally
Simply run:
`npm run test`

With the basic setup as supplied, this will run an initial test on your specified domain. If you don't have any reference screenshots (or your screenshots are out of date) these tests will fail by default. To get some references, simply approve your tests by running:

```
npm run approve
```

Now you can happily change your local apps and run tests (with `npm run test`) to make sure you've not broken things! Every time you make a positive change, simply run `npm run approve` to update your reference screenshots.

Running the default `test` command will run 37 scenarios, each one with 3 views (desktop, tablet and phone), amounting to 111 screenshots. This will take a while to run all of these and may start eating into your machine's memory in a non-trivial way. To subvert this, scenarios are broken down into the following sections:

- Homepage - 1 scenario
- Dataset - 11 scenarios
- Publisher - 5 scenarios
- Harvest - 9 scenarios
- User - 8 scenarios
- Admin - 3 scenarios

You can use these section keywords to only target specific scenarios using the command `npm run test:[keyword]`. For example, to only test the harvest section, simply run `npm run test:harvest` to only run those 9 scenarios. You can similarly target a single scenario or however many you want by passing the `filter` flag with some targetting regex for the scenario label(s) directly to the `test` script, like so:

```
npm run test -- --filter=[your specific scenario]
```

For running ckan locally, it is recommended you use the [docker-ckan project](https://github.com/alphagov/docker-ckan). Please see the documentation for that project for details on how to run ckan locally via docker.

## Updating tests
To add new test scenarios, update `config.js` under the `scenarios` key and follow the format of other entries in the list. If you're updating existing scenarios to fix a test failure as part of your pipeline, you should use the pipeline popup menu to re-run visual regression tests and then approve them. If you're adding new tests, you'll probably want to run the visual regression tests directly (i.e. not as part of a release pipeline) through the Jenkins job (using 'Build with parameters') and then approve them manually as well. Make sure to review the test report before approving to check nothing else has slipped in, and ensure no-one else triggers a test run between your test and approval.

## Gotchas
In scenarios that involve submitting a form to test for form errors, the ideal would be to use `form.submit()` in line with the browser API. Unfortuantely, ckan's `basic-form` js module hijacks the form submission flow, meaning that the submit button for that form has to be explicitly clicked. This can be done via puppeteer, however you will find that scenarios using this ocassionally unpredictably break. It's not clear why this happens, possibly because the speed at which puppeteer operates means it is clicking the submit button before the `basic-form` module has loaded.

Backstop doesn't have a testing library for IE or Edge. We have a need to support IE11 at least for this project, so you may need to do some additional manual testing on top of running these tests.