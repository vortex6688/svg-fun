import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'styleguide',
  styleUrls: [ './style.scss'  ],
  templateUrl: './styleguide.component.html'
})
export class StyleguideComponent implements OnInit {
  public ngOnInit() {
    console.log('StyleGuide Initialized');
  }
}
