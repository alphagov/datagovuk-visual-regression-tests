![Node.js CI](https://github.com/alphagov/datagovuk-visual-regression-tests/workflows/Node.js%20CI/badge.svg)

# DATA.GOV.UK - Visual Regression Testing
This repo contains the BackstopJS configuration in order to run visual regression tests for the [data.gov.uk admin panel](https://ckan.publishing.service.gov.uk/).

## Credits
This repo is a fork of the work done by the [Digital Marketplace team](https://github.com/alphagov/digitalmarketplace-visual-regression)

## Setup
Ensure that you have the latest versions of Node js and NPM installed locally.

Clone this repo and run:

```
npm install
```

Clone the `.env.example` file and create a `.env` file at the root of your local repo. Fill in the environment variables in accordance with their descriptions in `.env.example`.

If your local ckan doesn't have any data in it, it's recommended that you run `npm run setup`. See the data setup section below for more details.

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
To add new test scenarios, update `config.js` under the `scenarios` key and follow the format of other entries in the list. Each scenario expects the following attributes:

- `label`: The name of the scenario. Please be descriptive and use a prefix where appropriate eg: if your new test is within the publisher views, the label should be "Publisher - [your test]".
- `url`: The url of the scenario. Remember to make use of `process.env.DOMAIN` as necessary.

In addition to the above, you can add the following additional attributes depending on what you need for your scenario:

- `skipLogin`: This will skip the login step. For instances where you are testing a view that relies on not being logged in.
- `closeAdminToolbar`: If your view shows the admin toolbar, this will close it for you.
- `submitForm`: Assumes there is a single form on your view and submits it. This is principally for instances where you want to test how form errors look on forms. Please see the Gotchas section below for details on a minor quirk within ckan forms.
- `organogram`: Waits for elements specific to the image upload functionality to ensure that views involving organogram uploads to run properly for tests.

Make sure to review the test report before approving to check nothing else has slipped in, and ensure no-one else triggers a test run between your test and approval.

## Data setup
In order to ensure that tests are based on consistent data and therefore consistent views, this repo includes a data setup for ckan. This is a simple set of scripts that use puppeteer to mock user interaction, running through routes it expects to exist based on the consistent data and creating data using the interface as a user would. You can access this primarily through `npm run setup` which is an alias for `node setup/index.js all`. Running the setup script with the `all` keyword, as setup in the aforementioned alias` will run all of the following scripts in sequence:

- `npm run setup:publisher`: Creates a simple publisher in your local ckan
- `npm run setup:harvest`: Creates a harvest source using the [mock harvest source](https://github.com/alphagov/ckan-mock-harvest-sources) URL and triggers the source to generate a dataset with a series of resources
- `npm run setup:publisher`: Creates an organogram dataset aka: a dataset with it's schema/vocabulary set to one of the 2 "organisation structure" options, and 2 resources: one without a source specified and one with. This is done due to a seperate view being produced in the edit resource page if the dataset it's being built for is an organogram dataset.

## Gotchas
In scenarios that involve submitting a form to test for form errors, the ideal would be to use `form.submit()` in line with the browser API. Unfortuantely, ckan's `basic-form` js module hijacks the form submission flow, meaning that the submit button for that form has to be explicitly clicked. This can still be done via puppeteer, however it's not especially neat.

On organogram resource views, ckan's `image-upload` module takes a little while to load and puppeteer manages to beat it 9 times out of 10. The `organogram.js` script has therefore been added to wait for the js to load.

When triggering a harvest job, in the user UI, the user click the "reharvest" button and a modal window pops up to confirm the action. This isn't possible to do in puppeteer cleanly, as puppeteer loads before the modal js can finish loading. The workaround for this has been to click the reharvest button and trigger a page reload via `page.reload()`. This works because we are accessing the page before the modal js can create an artificial barrier to the user carrying out the reharvest action.

On certain views, an admin toolbar is present. This appears to only be visible for super admins and interfere's with being able to properly interrogate screenshots for discrepencies. To remedy this, the script `close-admin-toolbar.js` has been created to manage this on views where it pops up.

Backstop doesn't have a testing library for IE or Edge. The reason for this is that backstop relies on the headless infrastructure provided by engines like puppeteer or caspar, something that old microsoft browsers don't suppert. We have a need to support IE11 at least for this project, so you may need to do some additional manual testing on top of running these tests.