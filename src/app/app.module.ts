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

import '../styles/main.scss';

const ROUTES: Routes = [];

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
  providers: [ActionCreatorFactory],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  public hmrOnInit(store) {
    if (!store || !store.state) { return; }
    console.log('HMR store', store);
    console.log('store.state.data:', store.state.data);
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
    let cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
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
