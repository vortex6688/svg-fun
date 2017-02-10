import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { StyleguideComponent } from './styleguide.component';

const ROUTES: Routes = [
  { path: 'styleguide',  component: StyleguideComponent },
];

@NgModule({
  bootstrap: [ StyleguideComponent ],
  declarations: [
    StyleguideComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(ROUTES),
    NgbModule,
  ],
  providers: [ ]
})
export class TnStyleguideModule {}
