import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule }          from '@angular/http';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { NgbModule }           from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage }       from 'ng2-webstorage';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { TnNavbarComponent } from './tn-navbar/tn-navbar.component';
import { UserService } from './user';
import { AuthService } from './auth';
import { TnApiHttpService } from './tn-api-http';
import { OrderService } from './orders';
import { DatepickerComponent,
         CalendarIconComponent,
         CaretLeftIconComponent,
         CaretRightIconComponent }  from './datepicker.component';
import { TnPaginationComponent } from './tn-pagination/tn-pagination.component';
import { TnPaginationConfig } from './tn-pagination/pagination-config';
import { IconCheckComponent, IconCloseComponent, IconCreateComponent, IconDeleteComponent, IconDownloadComponent, IconRevertComponent } from './tn-icons';

@NgModule({
  imports:      [ CommonModule, FormsModule, HttpModule,
                  RouterModule, NgbModule, Ng2Webstorage ],
  providers:    [ AuthService,
                  TnApiHttpService.provider(),
                  OrderService,
                  TnPaginationConfig,
                  UserService ],
  declarations: [ DatepickerComponent,
                  CalendarIconComponent,
                  CaretLeftIconComponent,
                  CaretRightIconComponent,
                  TnNavbarComponent,
                  TnPaginationComponent,
                  IconCheckComponent, IconCloseComponent, IconCreateComponent,
                  IconDeleteComponent, IconDownloadComponent, IconRevertComponent
                ],
  schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
  exports:      [ DatepickerComponent, CommonModule, TnNavbarComponent, TnPaginationComponent,
                  IconCheckComponent, IconCloseComponent, IconCreateComponent,
                  IconDeleteComponent, IconDownloadComponent, IconRevertComponent ]

})
export class TnCommonModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: TnCommonModule, providers: [TnPaginationConfig]};
  }
}
