import { NgModule }            from '@angular/core';
import { HttpModule }          from '@angular/http';
import { CommonModule }        from '@angular/common';
import { NgbModule }           from '@ng-bootstrap/ng-bootstrap';
import { TnNavbarComponent } from './tn-navbar/tn-navbar.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { TnApiHttpService } from './tn-api-http';

@NgModule({
  imports:      [ CommonModule, HttpModule, RouterModule, NgbModule ],
  providers:    [ TnApiHttpService.provider() ],
  declarations: [ TnNavbarComponent ],
  exports:      [ CommonModule, TnNavbarComponent ]
})
export class TnCommonModule { }
