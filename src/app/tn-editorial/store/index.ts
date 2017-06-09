import { NgModule } from '@angular/core';
import { StoreModule, combineReducers } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreRegistry } from '../../tn-common/store/store.registry';
import { moduleReducers, moduleActions } from './reducers';

const storeAssets = StoreRegistry.registerReducers(moduleReducers);
export function productionReducer(state: any, action: any) {
    return combineReducers(storeAssets.reducers)(state, action);
}

const devTools = [];
if (process.env.ENABLE_STORE_DEVTOOLS) {
    devTools.push(StoreDevtoolsModule.instrumentOnlyWithExtension());
}

@NgModule({
  imports: [
    StoreModule.provideStore(productionReducer),
    ...devTools,
  ],
  providers: [ ...moduleActions ]
})
export class TnEditorialStoreModule {}
