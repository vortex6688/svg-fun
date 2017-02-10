import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ExampleComponent }    from './example.component';
import { NgbModule }           from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports:      [ NgbModule, CommonModule ],
  declarations: [ ExampleComponent ],
  exports:      [ ExampleComponent, CommonModule ]
})
export class TnCommonModule { }
