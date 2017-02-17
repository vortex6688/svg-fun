import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { TnCommonModule } from '../tn-common';

import { StyleguideComponent } from './styleguide.component';
import { LayoutOverviewComponent,
         LayoutGridComponent,
         LayoutMediaObjectComponent,
         LayoutResponsiveUtilitiesComponent } from './layout/index.ts';
import { ContentRebootComponent,
         ContentTypographyComponent,
         ContentCodeComponent,
         ContentImagesComponent,
         ContentTablesComponent,
         ContentFiguresComponent } from './content/index.ts';

const ROUTES: Routes = [
  { path: 'styleguide',
    component: StyleguideComponent,
    children: [
      {  path: '', redirectTo: 'layout/overview', pathMatch: 'full' },
      {  path: 'layout', redirectTo: 'layout/overview', pathMatch: 'full' },
      {  path: 'layout/overview', component: LayoutOverviewComponent },
      {  path: 'layout/grid', component: LayoutGridComponent },
      {  path: 'layout/media-object', component: LayoutMediaObjectComponent },
      {  path: 'layout/responsive-utilities', component: LayoutResponsiveUtilitiesComponent },
      {  path: 'content', redirectTo: 'content/reboot', pathMatch: 'full' },
      {  path: 'content/reboot', component: ContentRebootComponent },
      {  path: 'content/typography', component: ContentTypographyComponent },
      {  path: 'content/code', component: ContentCodeComponent },
      {  path: 'content/images', component: ContentImagesComponent },
      {  path: 'content/tables', component: ContentTablesComponent },
      {  path: 'content/figures', component: ContentFiguresComponent }
    ]
  }
];

@NgModule({
  bootstrap: [ StyleguideComponent ],
  declarations: [
    StyleguideComponent,
    LayoutOverviewComponent,
    LayoutGridComponent,
    LayoutMediaObjectComponent,
    LayoutResponsiveUtilitiesComponent,
    ContentRebootComponent,
    ContentTypographyComponent,
    ContentCodeComponent,
    ContentImagesComponent,
    ContentTablesComponent,
    ContentFiguresComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(ROUTES),
    NgbModule,
    TnCommonModule
  ],
  providers: [ ]
})
export class TnStyleguideModule {}
