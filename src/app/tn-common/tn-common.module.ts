import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule }          from '@angular/http';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { NgbModule }           from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { TnNavbarComponent } from './tn-navbar/tn-navbar.component';
import { TnApiHttpService } from './tn-api-http';
import { DatepickerComponent,
         CalendarIconComponent,
         CaretLeftIconComponent,
         CaretRightIconComponent }  from './datepicker.component';

@NgModule({
  imports:      [ CommonModule, FormsModule, HttpModule, RouterModule, NgbModule ],
  providers:    [ TnApiHttpService.provider() ],
  declarations: [ DatepickerComponent,
                  CalendarIconComponent,
                  CaretLeftIconComponent,
                  CaretRightIconComponent,
                  TnNavbarComponent ],
  schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
  exports:      [ DatepickerComponent, CommonModule, TnNavbarComponent ]

})
export class TnCommonModule { }
