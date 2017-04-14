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
         LayoutResponsiveUtilitiesComponent } from './layout';
import { ContentRebootComponent,
         ContentTypographyComponent,
         ContentCodeComponent,
         ContentImagesComponent,
         ContentTablesComponent,
         ContentFiguresComponent } from './content';
import { ComponentsAlertsComponent,
         ComponentsCollapseComponent,
         ComponentsModalComponent,
         ComponentsFormsComponent,
         ComponentsPaginationComponent,
         ComponentsButtonsComponent } from './components';
import { UtilitiesBordersComponent,
         UtilitiesClearfixComponent,
         UtilitiesCloseIconComponent,
         UtilitiesFlexboxComponent,
         UtilitiesColorsComponent,
         UtilitiesDisplayPropertyComponent,
         UtilitiesInvisibleContentComponent,
         UtilitiesImageReplacementComponent } from './utilities';

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
      {  path: 'content/figures', component: ContentFiguresComponent },
      {  path: 'components', redirectTo: 'components/alerts', pathMatch: 'full' },
      {  path: 'components/alerts', component: ComponentsAlertsComponent },
      {  path: 'components/collapse', component: ComponentsCollapseComponent },
      {  path: 'components/forms', component: ComponentsFormsComponent },
      {  path: 'components/modal', component: ComponentsModalComponent },
      {  path: 'components/pagination', component: ComponentsPaginationComponent },
      {  path: 'components/buttons', component: ComponentsButtonsComponent },
      {  path: 'utilities', redirectTo: 'utilities/borders', pathMatch: 'full' },
      {  path: 'utilities/borders', component: UtilitiesBordersComponent },
      {  path: 'utilities/clearfix', component: UtilitiesClearfixComponent },
      {  path: 'utilities/close-icon', component: UtilitiesCloseIconComponent },
      {  path: 'utilities/flexbox', component: UtilitiesFlexboxComponent },
      {  path: 'utilities/colors', component: UtilitiesColorsComponent },
      {  path: 'utilities/display-property', component: UtilitiesDisplayPropertyComponent },
      {  path: 'utilities/invisible-content', component: UtilitiesInvisibleContentComponent },
      {  path: 'utilities/image-replacement', component: UtilitiesImageReplacementComponent }
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
    ContentFiguresComponent,
    ComponentsAlertsComponent,
    ComponentsCollapseComponent,
    ComponentsFormsComponent,
    ComponentsModalComponent,
    ComponentsPaginationComponent,
    ComponentsButtonsComponent,
    UtilitiesBordersComponent,
    UtilitiesClearfixComponent,
    UtilitiesCloseIconComponent,
    UtilitiesFlexboxComponent,
    UtilitiesColorsComponent,
    UtilitiesDisplayPropertyComponent,
    UtilitiesInvisibleContentComponent,
    UtilitiesImageReplacementComponent
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
