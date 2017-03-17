import { Component } from '@angular/core';
import { NgbDatepickerConfig,
         NgbDatepickerI18n,
         NgbDateStruct,
         NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerNames } from './custom-datepicker-names.component';
import { CustomDateParserFormatter } from './custom-date-parser-formatter.component';

@Component({
    selector: 'datepicker',
    styleUrls: [ './datepicker.component.scss' ],
    templateUrl: './datepicker.component.html',
    providers: [NgbDatepickerConfig,
                {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
                {provide: NgbDatepickerI18n, useClass: CustomDatepickerNames}]
})

export class DatepickerComponent {

  public model: NgbDateStruct;
  public d;

  constructor(config: NgbDatepickerConfig) {
      config.firstDayOfWeek = 7;
      config.navigation = 'arrows';
  }
}
