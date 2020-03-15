import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageUrlPipe} from './image-url.pipe';
import { ImageObjectPipe } from './image-object.pipe';



@NgModule({
  declarations: [ImageUrlPipe, ImageObjectPipe],
  imports: [
    CommonModule
  ],
  exports: [ImageUrlPipe, ImageObjectPipe]
})
export class PipesModule {}
