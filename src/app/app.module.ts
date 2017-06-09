import { ActionCreatorFactory } from 'ngrx-action-creator-factory';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { TnAdminModule } from './tn-admin';
import { TnEditorialModule } from './tn-editorial';
import { TnStyleguideModule } from './tn-styleguide';

import { AppComponent } from './app.component';

import { TnApiBaseUrl } from './tn-common/tn-api-http';

import '../styles/main.scss';

const ROUTES: Routes = [];

export function getEnvApiUrl() {
  // this is, sadly, required.
  // useValue in the provider below will fail in AOT mode as the
  // angular compiler won't see process.env.TN_API_URL;
  // replacing it with a lambda will fail to run AOT with:
  // Error encountered resolving symbol values statically. Function calls are not supported.
  // so we export this function to allow the AOT builder to function properly, and to
  // allow AOT to see process.env
  return process.env.TN_API_URL;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    TnAdminModule,
    TnEditorialModule,
    TnStyleguideModule

  ],
  providers: [
    ActionCreatorFactory,
    // provide TnApiBaseUrl, required configuration.
    { provide: TnApiBaseUrl, useFactory: getEnvApiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
    /* tslint:disable:no-console */
    console.log('TypeNetwork, (c) 2017, All Rights Reserved.');
    /* tslint:enable:no-console */
  }
  public hmrOnInit(store) {
    if (!store || !store.state) { return; }
    // inject AppStore here and update it
    // this.AppStore.update(store.state)
    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    // change detection
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }
  public hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // inject your AppStore and grab state then set it on store
    // var appState = this.AppStore.get()
    store.state = {data: 'yolo'};
    // store.state = Object.assign({}, appState)
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }
  public hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
    // anything you need done the component is removed
  }
}
