import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import template from './template.html';

@Component({
  selector: 'styleguide',
  styleUrls: [ './style.scss'  ],
  template
})
export class StyleguideComponent implements OnInit {
  public ngOnInit() {
    console.log('StyleGuide Initialized');
  }
}
