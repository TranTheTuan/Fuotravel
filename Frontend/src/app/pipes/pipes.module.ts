import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageUrlPipe} from './image-url.pipe';
import { ImageObjectPipe } from './image-object.pipe';
import { GenderPipe } from './gender.pipe';



@NgModule({
  declarations: [ImageUrlPipe, ImageObjectPipe, GenderPipe],
  imports: [
    CommonModule
  ],
    exports: [ImageUrlPipe, ImageObjectPipe, GenderPipe]
})
export class PipesModule {}
