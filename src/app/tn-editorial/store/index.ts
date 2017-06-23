import { NgModule } from '@angular/core';
import { StoreModule, combineReducers } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreRegistry } from '../../tn-common/store/store.registry';
import { moduleReducers, moduleActions } from './reducers';

const storeAssets = StoreRegistry.registerReducers(moduleReducers, moduleActions);
export function productionReducer(state: any, action: any) {
    return combineReducers(storeAssets.reducers)(state, action);
}

const devTools = process.env.ENABLE_STORE_DEVTOOLS ?
                    [StoreDevtoolsModule.instrumentOnlyWithExtension()] :
                    [];

@NgModule({
  imports: [
    StoreModule.provideStore(productionReducer),
    ...devTools,
  ],
  providers: [ ...moduleActions ]
})
export class TnEditorialStoreModule {}