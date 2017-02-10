/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './tn-editorial/environment';
import { bootloader } from '@angularclass/hmr';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { TnEditorialModule } from './tn-editorial';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(TnEditorialModule)
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
