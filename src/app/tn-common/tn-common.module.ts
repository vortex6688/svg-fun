import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { TnNavbarComponent } from './tn-navbar/tn-navbar.component';
import { UserService } from './user';
import { AuthService } from './auth';
import { TnApiHttpService } from './tn-api-http';
import { LicenseService } from './licenses';
import { TnTitleService } from './tn-title';
import { TnAutoscrollService } from './tn-autoscroll';
import { OrderService } from './orders';
import { SeriesService } from './series';
import { FamilyService } from './families';
import { StyleService } from './styles';
import { ProjectService } from './projects';
import { FoundryService } from './foundries';
import { DesignerService } from './designers';
import { CustomerService } from './customers';
import { DatepickerComponent,
         CalendarIconComponent,
         CaretLeftIconComponent,
         CaretRightIconComponent } from './datepicker.component';
import { TnPaginationComponent } from './tn-pagination/tn-pagination.component';
import { TnPaginationConfig } from './tn-pagination/pagination-config';
import { IconCheckComponent,
         IconCloseComponent,
         IconCreateComponent,
         IconDeleteComponent,
         IconDownloadComponent,
         IconRevertComponent,
         IconRightArrowComponent,
         IconSelectComponent,
         IconWebComponent,
         IconAddComponent,
         IconCopyComponent,
         IconFontComponent,
         IconAddLicenseComponent,
         IconDesktopComponent,
         IconAppComponent,
         IconTooltipComponent,
         IconSearchComponent,
         IconPencilComponent } from './tn-icons';
import { OrderByPipe } from './pipes';
import { DataGuard } from './data.guard';
import { DropdownInputComponent } from './dropdown-input/dropdown-input.component';

@NgModule({
  imports:      [ CommonModule, FormsModule, HttpModule,
                  RouterModule, NgbModule, Ng2Webstorage ],
  providers:    [ AuthService,
                  TnApiHttpService.provider(),
                  OrderService,
                  LicenseService,
                  SeriesService,
                  FamilyService,
                  StyleService,
                  ProjectService,
                  FoundryService,
                  DesignerService,
                  CustomerService,
                  TnPaginationConfig,
                  TnTitleService.provider(),
                  TnAutoscrollService.provider(),
                  UserService,
                  DataGuard,
                ],
  declarations: [ DatepickerComponent,
                  CalendarIconComponent,
                  CaretLeftIconComponent,
                  CaretRightIconComponent,
                  TnNavbarComponent,
                  TnPaginationComponent,
                  IconCheckComponent, IconCloseComponent, IconCreateComponent,
                  IconDeleteComponent, IconDownloadComponent, IconRevertComponent,
                  IconRightArrowComponent, IconSelectComponent, IconWebComponent,
                  IconAddComponent, IconCopyComponent, IconFontComponent, IconAddLicenseComponent,
                  IconDesktopComponent, IconAppComponent, IconTooltipComponent,
                  IconSearchComponent, IconPencilComponent, OrderByPipe, DropdownInputComponent
                ],
  schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
  exports:      [ DatepickerComponent,
                  CommonModule,
                  TnNavbarComponent,
                  TnPaginationComponent,
                  IconCheckComponent,
                  IconCloseComponent,
                  IconCreateComponent,
                  IconDeleteComponent,
                  IconDownloadComponent,
                  IconRevertComponent,
                  IconRightArrowComponent,
                  IconSelectComponent,
                  IconWebComponent,
                  IconAddComponent,
                  IconCopyComponent,
                  IconFontComponent,
                  IconAddLicenseComponent,
                  IconDesktopComponent,
                  IconAppComponent,
                  IconTooltipComponent,
                  IconSearchComponent,
                  IconPencilComponent,
                  OrderByPipe,
                  DropdownInputComponent,
                ]

})
export class TnCommonModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: TnCommonModule, providers: [TnPaginationConfig]};
  }

  constructor(
    protected titleService: TnTitleService,
    protected autoscrollService: TnAutoscrollService,
    protected authService: AuthService
  ) {}
}
