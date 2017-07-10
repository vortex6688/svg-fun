# AdviceNyc

## Instruction

### To get started, there is a few simple steps:

- Open a command line tool and navigate to the folder with the project like so:
`cd path-to-the-project/`

- Run `npm install` to install the dependencies 

- To build a project, run `gulp`, it will build the project into `dist` folder and start the website in your browser automatically

#### Note!

If website did not open or you close the browser tab and need to reopen it in a new tab or another browser, symply use 
`http://localhost:3000`

Make sure the port `:3000` is not used by other applications.

### Workflow instruction:

- Any updates or changes should be made only in a `src/` folder, gulp will take care of it and rebuild the project into the`dist/` folder.

Dist folder used as a `"Production"` part of the project.

- Newly created issues should have a decent description, possibly screenshots if needed.

- Once you decide to work on a certain issue, please assign yourself to it, so anyone else would know that you are already working on it, to avoid any possible confusion and save time...

- To suggest any changes/updated, create a pull request and refer it to a certain issue, like so

`"this pr closes #{link to an issue it resolves}"`

Pr names should also reflect the issue they are referenced to, and include the issue's number, like so: 

`"3 fix navbar layout margin"`

- Ant time new PR is created, before merging it, it should be reviewed by another member of the developing team, then merged if approved.