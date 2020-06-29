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
BackstopJS compares an intance of ckan that you specify in the .env file, uses puppeteer to run that instance through a set of scenarios aka: views within the ckan user journey and variations of those views, and compares screenshots taken from those scenarios to existing screenshots stored in source control. Backstop will then produce a html report for interrogation, making use of puppeteer's rich diff functionality. You as the dev working on a feature or bugfix can then assess if any changes produced are acceptable or not and approve these changes, updating the screenshots in source control.

The original intent of these tests was to assess changes between versions of ckan to ensure that the admin frontend hadn't broken when upgrading. This however has evolved as we start to think about ways to integreate this testing suite into a consistent CI flow.

If these admin journeys change at any point, the scenarios in this tool will need to be reviewed.

## Running tests locally
### Quick start
`npm run test`

With the basic setup as supplied, this will run an initial test on the domain specified in your .env file. By default, this will run against screenshots stored for ckan version 2.7. You can see the report by opening `backstop_data/html_report/index.html` in your browser. If there are any changes between the instance you are running and the stored screenshots then these tests will fail, showing diffs in the produced report. If you want to update these screenshots to the most recently run test screenshots, you can run:

```
npm run approve
```

This will update your saved screenshots to the most recently run tests. Remember you still have to commit these changes to source control. Every time you make a positive change, simply run `npm run test` to ensure visual fidelity and then `npm run approve` to update your reference screenshots.

### Different ckan versions and view filters
This repo includes mutliple scenario "sets" for different version of ckan. Currently, this includes a set of screenshots for ckan 2.8 and for 2.7. By default, running `test` will use the config for 2.7. To use a different config, for example 2.8, just pass this as an argument:

```
npm run test 2.8
```

This will run your local instance against ckan 2.8 instead of 2.7. Remember that your .env file needs to reflect the scenario set that you are testing eg: Don't run a local version of 2.8 against the 2.7 scenarios (unless this is explicitly what you want to do, in which case do not approve these changes as they will override the existing 2.7 scenario set).

Running the default `test` against any ckan config currently command will trigger 40 scenarios, each one with 3 views (desktop, tablet and phone), totalling to 120 tests. This will take a while to run all of these and may start eating into your machine's memory in a non-trivial way. To subvert this, scenarios are broken down into the following sections:

- homepage - 1 scenario
- dataset - 11 scenarios
- publisher - 5 scenarios
- harvest - 9 scenarios
- user - 8 scenarios
- dashboard - 3 scenarios
- admin - 3 scenarios

You can use these section keywords to only target specific scenarios using the command `npm run test [config] [keyword]`. For example, to only test the harvest section for ckan 2.7, simply run `npm run test 2.7 harvest` to only run those 9 scenarios for 2.7. You can similarly target a single scenario or however many you want by passing the `filter` flag with some targetting regex for the scenario label(s) directly to the `test` script, like so:

For running ckan locally, it is recommended you use the [docker-ckan project](https://github.com/alphagov/docker-ckan). Please see the documentation for that project for details on how to run ckan locally via docker.

## Updating tests
To add new test scenarios, you can update `configs/ckan-config.js` under the `scenarios` key and follow the format of other entries in the list. Each scenario expects the following attributes:

- `label`: The name of the scenario. Please be descriptive and use a prefix where appropriate eg: if your new test is within the publisher views, the label should be "Publisher - [your test]".
- `url`: The url of the scenario. Remember to make use of `process.env.DOMAIN` as necessary.

In addition to the above, you can add the following additional attributes depending on what you need for your scenario:

- `skipLogin`: This will skip the login step. For instances where you are testing a view that relies on not being logged in.
- `closeAdminToolbar`: If your view shows the admin toolbar, this will close it for you.
- `submitForm`: Assumes there is a single form on your view and submits it. This is principally for instances where you want to test how form errors look on forms. Please see the Gotchas section below for details on a minor quirk within ckan forms.
- `organogram`: Waits for elements specific to the image upload functionality to ensure that views involving organogram uploads to run properly for tests.

Make sure to review the test report before approving to check that no unwanted changes have slipped in.

If you want to add a new scenario set, you can add a new config root under the `configs` directory. If you are adding a new ckan version, it is recommended that you follow the setup in the other ckan config roots (currently `2.7.js` and `2.8.js`) and reference `ckan-config.js` as they do. If you are adding a completely new set of scenarios relating to datagovuk but unrelated to the ckan admin panel, you will need to create an entirely new config. You can use `ckan-config.js` as a basis for your config. If you want to use filters in your new scenario, it is recommended that you edit `test.js` and amend the code to properly catch your filter.

## Ckan data setup
In order to ensure that tests are based on consistent data and therefore consistent views, this repo includes a data setup for ckan. This is a simple set of scripts that use puppeteer to mock user interaction, running through routes it expects to exist based on the consistent data and creating data using the interface as a user would. You can access this primarily through `npm run setup` which is an alias for `node setup/index.js all`. Running the setup script with the `all` keyword, as setup in the aforementioned alias` will run all of the following scripts in sequence:

- `npm run setup:publisher`: Creates a simple publisher in your local ckan
- `npm run setup:harvest`: Creates a harvest source using the [mock harvest source](https://github.com/alphagov/ckan-mock-harvest-sources) URL and triggers the source to generate a dataset with a series of resources
- `npm run setup:organogram`: Creates an organogram dataset aka: a dataset with it's schema/vocabulary set to one of the 2 "organisation structure" options, and 2 resources: one without a source specified and one with. This is done due to a seperate view being produced in the edit resource page if the dataset it's being built for is an organogram dataset.

## Debugging issues in the code
Because a lot of the code in this repo is abstracted by puppeteer running a headless browser instance, as well as relying on an instance of docker-ckan running alongside, debugging issues can be difficult. If you encounter issues whilst running or developing upon this repo, it is recommended that you try the following:

- Look at the Gotchas section below.

It could be that the issue you're encountering has already been captured and explored.

- Use puppeteer's screenshot functionality.

```
await page.screenshot({path: 'screenshot.png'});
```

In the above example, puppeteer will take a screenshot of the current instance of puppeteer and output it to `screenshot.png` at the root of your local repo. You can change the output location to whatever you want and put this line virtually anywhere in this code and it'll be valid. This will give you a representation of puppeteer's state at any one time compared to what you're expecting.

If you do find an issue, please either create a pull request or add it to the gotchas below.

## Gotchas
### Issues with ckan
- In ckan scenarios that involve submitting a form to test for form errors, the ideal would be to use `form.submit()` in line with the browser API. Unfortuantely, ckan's `basic-form` js module hijacks the form submission flow, meaning that the submit button for that form has to be explicitly clicked. This can still be done via puppeteer, however it's not especially neat.
- On any view with an upload field, notably the organogram resource views, ckan's `image-upload` js module takes a little while to load and puppeteer manages to beat it 9 times out of 10. The `upload-field.js` script has therefore been added to wait for the js to load.
- Similar to the above around having to wait for js to load in a view, some forms have an autofill slug field, managed by ckan's `slug-preview` module. This both hides one field and generates markup for a non-input field which auto-updates based on an associated input field. Like above, puppeteer beats the rendering work for this 9 times out of 10, creating inconsistent view tests. The `slug-preview.js` script exists to account for this.
- When triggering a harvest job, in the user UI, the user clicks the "reharvest" button and a modal window pops up to confirm the action. This isn't possible to do in puppeteer cleanly, as puppeteer loads before the modal js can finish loading. The workaround for this has been to click the reharvest button and trigger a page reload via `page.reload()`. This works because we are accessing the page before the modal js can create an artificial barrier to the user carrying out the reharvest action.
- On certain views, an admin toolbar is present. This appears to only be visible for super admins and interfere's with being able to properly interrogate screenshots for discrepencies. To remedy this, the script `close-admin-toolbar.js` has been created to manage this on views where it pops up.
- Backstop has the option to ignore portions of html that we don't want to include in tests eg: fields that relate to times that will be constantly changing. Unfortunately this is very difficult to police in our ckan instances as we use a mix of markup from our own extension and default ckan admin panel markup, making it a near impossible job to apply selectors to all unwanted fields across the ckan admin panel.

### Backstop limitations
- Backstop doesn't have a testing library for IE or Edge. The reason for this is that backstop relies on the headless infrastructure provided by engines like puppeteer or caspar, something that old microsoft browsers don't suppert. We have a need to support IE11 at least for this project, so you may need to do some additional manual testing on top of running these tests.
- Backstop storing screenshots in source control is potentially problematic. A single set of ckan scenarios (120 screenshots) comes to approximately 15MB. A long term solution needs ot be considered for how we store scenarios to avoid taking up obscene amounts of space in source control.
