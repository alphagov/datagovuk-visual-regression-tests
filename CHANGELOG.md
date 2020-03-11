# Digital Marketplace Visual Regression changelog

Records breaking changes from major version bumps

## 3.0.0

- Remove Dockerfile as it is no longer needed
- Upgrade to BackstopJS v4

## 2.0.0

PR: [#15](https://github.com/alphagov/digitalmarketplace-visual-regression/pull/15)

The user id of the Jenkins user created for the container has changed from 106 to 1001. This is due to the new Jenkins
box having a different UID for it's jenkins user than the original one.

These ID's need to match, as the volume we map to the container has the same owner inside and outside the running
container. If the container's jenkins user's UID doesn't match the volume owner's, there are file permission errors.
