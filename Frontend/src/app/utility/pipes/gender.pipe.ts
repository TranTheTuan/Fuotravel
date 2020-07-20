import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let gender = '';
    switch (value) {
      case '1':
        gender = 'Male';
        break;
      case '2':
        gender = 'Female';
        break;
      case '3':
        gender = 'Other';
        break;
      default:
        break;
    }
    return gender;
  }

}
