import { Pipe, PipeTransform } from '@angular/core';
import {Image} from '../models/image';
import {environment} from '../../../environments/environment';

@Pipe({
  name: 'imageObject'
})
export class ImageObjectPipe implements PipeTransform {

  transform(images: Image[], ...args: unknown[]): unknown {
    if (!images) {
      return null;
    }
    const imagesArray: Array<object> = [];
    for (const image of images) {
      imagesArray.push({
        image: environment.assertURL + image.path,
        thumbImage: environment.assertURL + image.path,
        alt: '',
        title: ''
      });
    }
    return  imagesArray;
  }

}
