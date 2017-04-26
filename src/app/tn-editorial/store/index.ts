import { NgModule } from '@angular/core';
import { StoreModule, combineReducers } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreRegistry } from '../../tn-common/store/store.registry';
import { moduleReducers } from './reducers';

const storeAssets = StoreRegistry.registerReducers(moduleReducers);
const productionReducer = combineReducers(storeAssets.reducers);

const devTools = [];

if (process.env.ENABLE_STORE_DEVTOOLS) {
    devTools.push(StoreDevtoolsModule.instrumentOnlyWithExtension());
}

@NgModule({
  imports: [
    StoreModule.provideStore(productionReducer),
    ...devTools,
  ],
  providers: [ ...storeAssets.actions ]
})
export class TnEditorialStoreModule {}
