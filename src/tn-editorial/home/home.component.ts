import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  providers: [],
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html'
})
export class EditorialHomeComponent implements OnInit {
  public localState = { value: '' };

  public ngOnInit() {
    console.log('hello `Home` component');
  }

  public submitState(value: string) {
    console.log('submitState', value);
  }
}
