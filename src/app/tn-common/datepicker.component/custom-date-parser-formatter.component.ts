import { DatePipe } from '@angular/common';
import { NgbDateStruct,
         NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}
function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}
function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return '';
    }
}

export class CustomDateParserFormatter extends NgbDateParserFormatter {
    private datePipe = new DatePipe('en-US');
    constructor() {
        super();
    }
    public format(date: NgbDateStruct): string {
        return date ?
            `${isNumber(date.month) ? padNumber(date.month) : ''}/${isNumber(date.day) ?
                padNumber(date.day) : ''}/${date.year}` : '';
    }

    public parse(value: string): NgbDateStruct {
        let returnVal: NgbDateStruct;
        if (!value) {
            returnVal = null;
        } else {
            try {
                let dateParts = this.datePipe.transform(value, 'M-d-y').split('/');
                returnVal = { year: parseInt(dateParts[2], 10),
                              month: parseInt(dateParts[0], 10),
                              day: parseInt(dateParts[1], 10) };
            } catch (e) {
                returnVal = null;
            }
        }
        return returnVal;
    }
}
