import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ExampleComponent }    from './example.component';
import { NgbModule }           from '@ng-bootstrap/ng-bootstrap';
import { TnNavbarComponent } from './tn-navbar/tn-navbar.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

@NgModule({
  imports:      [ NgbModule, CommonModule, RouterModule ],
  declarations: [ ExampleComponent, TnNavbarComponent ],
  exports:      [ ExampleComponent, CommonModule, TnNavbarComponent ]
})
export class TnCommonModule { }
