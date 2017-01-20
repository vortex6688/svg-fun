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

## Running Tests

The best way to lint and run tests is by running: `npm run ci`. This will lint and test the project, ensuring it's up to snuff.

## Using `tn-common` namespace

The TN-Common module should be imported from your module as:

```TypeScript
import { TnCommonModule } from '../tn-common';
```

And applied in the `imports` section of your `NgModule`:

```typescript
@NgModule({
  bootstrap: [ /* ... */ ],
  declarations: [ /* ... */ ],
  imports: [
    /// ... 
    TnCommonModule, // hey this one is ours!
    /// ... 
  ],
  providers: [ /* ... */ ]
})
```

## Issue Tracking

All issue tracking is done on the primary [typenetwork.com repository](https://github.com/TypeNetwork/typenetwork.com). PR's should mention issues in this repository as well.

## IDE Integration

This project has been found to work with the following IDEs:

- [Sublime Text 3](https://www.sublimetext.com/3) with [TypeScript Plugin](https://github.com/Microsoft/TypeScript-Sublime-Plugin) and [SublimeLinter-contrib-tslint](https://github.com/lavrton/SublimeLinter-contrib-tslint), both installed via [Package Control](https://packagecontrol.io/installation)
- [Visual Studio Code](https://code.visualstudio.com) with [vscode-tslint](https://github.com/Microsoft/vscode-tslint) (installed via extensions installer)
