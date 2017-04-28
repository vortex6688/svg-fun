import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TnCommonModule } from '../tn-common';
import { TnEditorialComponent } from './tn-editorial.component';
import { EditorialHomeComponent } from './home';
import { TnEditorialStoreModule } from './store';

export const ROUTES: Routes = [
  { path: '',      component: EditorialHomeComponent },
  { path: 'home',  component: EditorialHomeComponent },
];

@NgModule({
  bootstrap: [ TnEditorialComponent ],
  declarations: [
    TnEditorialComponent,
    EditorialHomeComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    TnCommonModule,
    RouterModule.forChild(ROUTES),
    NgbModule,
    TnEditorialStoreModule,
  ],
  providers: [ ],
})
export class TnEditorialModule {}
