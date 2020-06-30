import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageUrlPipe} from './image-url.pipe';
import { ImageObjectPipe } from './image-object.pipe';
import { GenderPipe } from './gender.pipe';
import { LinkFragmentPipe } from './link-fragment.pipe';



@NgModule({
  declarations: [ImageUrlPipe, ImageObjectPipe, GenderPipe, LinkFragmentPipe],
  imports: [
    CommonModule
  ],
    exports: [ImageUrlPipe, ImageObjectPipe, GenderPipe, LinkFragmentPipe]
})
export class PipesModule {}
