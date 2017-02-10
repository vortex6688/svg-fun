import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TnCommonModule } from '../tn-common';
import { TnEditorialComponent } from './tn-editorial.component';
import { HomeComponent } from './home';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
];

@NgModule({
  bootstrap: [ TnEditorialComponent ],
  declarations: [
    TnEditorialComponent,
    HomeComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    TnCommonModule,
    RouterModule.forRoot(ROUTES),
    NgbModule.forRoot(),
  ],
  providers: [ ],
})
export class TnEditorialModule {}
