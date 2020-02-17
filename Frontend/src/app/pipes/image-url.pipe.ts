import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) {
      return null;
    }
    return environment.assertURL + value;
  }
}
