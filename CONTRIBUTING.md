# Contributing

## Bug Reporting and Improvements

Please open issues for any bugs encountered or ideas for improvements for the project.

## Modifying Code

Bug fixes and improvements are welcomed. Please verify your code changes are formatted with the project's Prettier configuration and the test suite passes. Adding new tests for your code changes is also encouraged.

## Publishing a Release

1. Run `yarn release` to publish a new release. (See `release` [CLI documentation](https://github.com/vercel/release) for more information.)
1. For each change, use the `release` CLI to select the appropriate semver type or ignore.
1. In the browser window that opens, set the GitHub Release title to the version number of the release, e.g. `2.0.11`.
1. Publish the GitHub Release.
1. In your shell, run `npm publish` to publish the new release to the npm registry.
