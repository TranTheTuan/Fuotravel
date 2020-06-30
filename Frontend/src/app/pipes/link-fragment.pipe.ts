import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'linkFragment'
})
export class LinkFragmentPipe implements PipeTransform {

  transform(value: string, isFragment: boolean): unknown {
    if (!value) { return null; }
    if (isFragment) {
      return value.split('#')[1];
    }
    return value.split('#')[0];
  }

}
