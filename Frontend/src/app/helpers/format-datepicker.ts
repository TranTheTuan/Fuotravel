import {MatDateFormats} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Moment} from 'moment';

export class AppDateAdapter extends MomentDateAdapter {
  format(date: Moment, displayFormat: string): string {
    if (displayFormat === 'input') {
      let day: string = date.date().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.month() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      const year = date.year();
      console.log(date.toISOString());
      return `${day}/${year}/${month}`;
    }
    return date.toISOString();
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  // parse: {
  //   dateInput: { month: 'short', year: 'numeric', day: 'numeric'},
  // },
  // display: {
  //   dateInput: 'input',
  //   monthYearLabel: { year: 'numeric', month: 'numeric'},
  //   dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  //   monthYearA11yLabel: { year: 'numeric', month: 'long'},
  // }
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
