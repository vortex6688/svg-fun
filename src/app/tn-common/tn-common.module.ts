import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { NgbModule }           from '@ng-bootstrap/ng-bootstrap';
import { TnNavbarComponent } from './tn-navbar/tn-navbar.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

@NgModule({
  imports:      [ NgbModule, CommonModule, RouterModule ],
  declarations: [ TnNavbarComponent ],
  exports:      [ CommonModule, TnNavbarComponent ]
})
export class TnCommonModule { }
