import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'admin-home',
  providers: [],
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html'
})
export class AdminHomeComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };

  public ngOnInit() {
    console.log('hello `Home` component');
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.localState.value = '';
  }
}
