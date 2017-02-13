# TN NG2 Project

This project contains the angular 2 components that make up the Editorial and Admin interfaces for TypeNetwork.

## Prerequisites

* NodeJS  >=6.9.x

## Quickstart (Requires Node 6 or better)

1. `npm install`
1. `npm run start:hmr`
1. Open `localhost:3000/`,  `localhost:3000/admin`, `localhost:3000/styleguide`

## Issue Tracking

Issue tracking is done in the [TypeNetwork/typenetwork.com](https://github.com/TypeNetwork/typenetwork.com) repository.

PR's should be made against [TypeNetwork/tn-admin-editorial]((https://github.com/TypeNetwork/tn-admin-editorial)
PR's should explicitly mention issues as ```TypeNetwork/typenetwork.com#{issueNumber}``` so cross repo linking will work properly

## Running Tests

**Unit Tests**
```
npm run test
```

**E2E Tests**

*terminal 1*
```
# serve a build for the end 2 end tests.
npm run server:dev:hmr
```

*terminal 2*
```
# with a server running, run the e2e tests.
npm run e2e
```

**Preflight**

Before merging a PR or making a release we should run the full suite of Unit and E2E tests against a production build.

*terminal 1*
```
# server to host app for e2e tests

npm run server:prod:ci
```

*terminal 2*
```
# with a server running, will run full suite of builds and tests.
# TODO: http-server doesn't support fall back for HTML5 mode so test fail, we need to swap out
# with a server app that does properly support fallback.
npm run ci
```

## Styling

We use [Bootstrap 4](https://v4-alpha.getbootstrap.com/getting-started/introduction/) and [SMACSS](https://smacss.com/) as a guide for our CSS. Styles
are found in src/app/tn-styleguide. We include Bootstap as SASS.

## IDE Integration

This project has been found to work with the following IDEs:

- [Sublime Text 3](https://www.sublimetext.com/3) with [TypeScript Plugin](https://github.com/Microsoft/TypeScript-Sublime-Plugin) and [SublimeLinter-contrib-tslint](https://github.com/lavrton/SublimeLinter-contrib-tslint), both installed via [Package Control](https://packagecontrol.io/installation)
- [Visual Studio Code](https://code.visualstudio.com) with [vscode-tslint](https://github.com/Microsoft/vscode-tslint) (installed via extensions installer)

@TODO: include .vscode and .sublime-project files to assist developers working on the project.
