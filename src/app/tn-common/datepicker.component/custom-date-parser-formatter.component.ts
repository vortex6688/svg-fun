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
        return date ? `${isNumber(date.month) ? padNumber(date.month) : ''}/${isNumber(date.day) ?
        padNumber(date.day) : ''}/${date.year}` : '';
    }

    public parse(value: string): NgbDateStruct {
        if (!value) {
            return null;
        }
        const dateParts = value.trim().split('/').map(toInteger);
        switch (dateParts.length) {
            case 1:
                return { year: dateParts[0], month: null, day: null };
            case 2:
                return { year: dateParts[1], month: dateParts[0], day: null };
            case 3:
                return { year: dateParts[2], month: dateParts[0], day: dateParts[1] };
            default:
                return null;
        }
    }
}
