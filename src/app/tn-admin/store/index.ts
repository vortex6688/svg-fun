import { NgModule } from '@angular/core';
import { StoreModule, combineReducers } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreRegistry } from '../../tn-common/store/store.registry';
import { moduleReducers, moduleActions, moduleEffects } from './reducers';
import { AuthActions } from '../../tn-common/auth';

const storeAssets = StoreRegistry.registerReducers(moduleReducers, moduleActions);
const rootReducer = (state: any, action: any) => combineReducers(storeAssets.reducers)(state, action);

// Reset state on logout
export function productionReducer(state, action) {
  if (action.type === AuthActions.LOGOUT) {
    state = undefined;
  }
  return rootReducer(state, action);
}

const devTools = process.env.ENABLE_STORE_DEVTOOLS ?
                    [StoreDevtoolsModule.instrumentOnlyWithExtension()] :
                    [];

@NgModule({
  imports: [
    StoreModule.provideStore(productionReducer),
    moduleEffects,
    ...devTools,
  ],
  providers: [ ...moduleActions ]
})
export class TnAdminStoreModule {}
