import { Injectable } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
    weekdays: ['M', 'T', 'W', 'Th', 'F', 'S', 'S'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
             'August', 'September', 'October', 'November', 'December'],
};

// Define custom service providing the months and weekdays custom name
@Injectable()
export class CustomDatepickerNames extends NgbDatepickerI18n {

  public getWeekdayShortName(weekday: number): string {
    return I18N_VALUES.weekdays[weekday - 1];
  }
  public getWeekdayName(weekday: number): string {
    return this.getWeekdayShortName(weekday);
  }
  public getMonthShortName(month: number): string {
    return I18N_VALUES.months[month - 1];
  }
  public getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}
