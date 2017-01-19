# TN Admin/Editorial Project

## Quickstart (Requires Node 6 or better)

1. `cd` to tn-admin-editorial
1. `npm install`
1. `npm run start:hmr`
1. Open `localhost:3000/admin` and `localhost:3000/editorial`

## Running multiple node versions per system 

Install [nvm](https://github.com/creationix/nvm) on Unix systems or [nvm-windows](https://github.com/coreybutler/nvm-windows) on Windows. For Mac, using the [homebrew](http://brew.sh/) version of nvm is recommended.

1. `nvm install 6`
1. `nvm use 6`

## Using `tn-common` namespace

Code that is shared between the admin and editorial components lives in `src/tn-common`. Modules and components from this space do not need relative paths, and can be imported as:

```typescript
import { ExampleComponent } from 'tn-common/example'
```

So too if there are cross-dependencies between admin and editorial. An admin component can be imported from editorial as:

```typescript
import { SomeComponent } from 'admin/some'
```

## Issue Tracking

All issue tracking is done on the primary [typenetwork.com repository](https://github.com/TypeNetwork/typenetwork.com). PR's should mention issues in this repository as well.

## IDE Integration

This project has been found to work with the following IDEs:

- [Sublime Text 3](https://www.sublimetext.com/3) with [TypeScript Plugin](https://github.com/Microsoft/TypeScript-Sublime-Plugin) via [Package Control](https://packagecontrol.io/installation)
- [Visual Studio Code](https://code.visualstudio.com) (out of the box support)
