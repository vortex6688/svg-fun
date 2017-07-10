import { Component, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { NgbDatepickerConfig,
         NgbDatepickerI18n,
         NgbDateStruct,
         NgbInputDatepicker,
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
  @ViewChild('d') public d: NgbInputDatepicker;
  @Output() public dateUpdate = new EventEmitter<Date>();

  constructor(config: NgbDatepickerConfig, private elementRef: ElementRef) {
    config.firstDayOfWeek = 7;
    config.navigation = 'arrows';
  }

  @HostListener('document:click', ['$event']) public onClick($event: MouseEvent) {
    if (this.d.isOpen() && !this.elementRef.nativeElement.contains($event.target)) {
      this.d.close();
    }
  }

  public onKey(date) {
    if (date.target.value.length === 2 || date.target.value.length === 5) {
      date.target.value += '/';
    }
  }

  public updateDate(data) {
    if (!data) {
      this.dateUpdate.emit(null);
      return;
    }
    const date = new Date(`${data.year}-${data.month}-${data.day}`);
    this.dateUpdate.emit(date);
  }
}
