/*
 * Angular bootstraping
 */
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  // three two one let's jam
  if (process.env.ENV === 'production') {
    enableProdMode();
  }

  return platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .catch((err) => console.error(err));
}

export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
