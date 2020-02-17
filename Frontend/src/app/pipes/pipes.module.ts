import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageUrlPipe} from './image-url.pipe';



@NgModule({
  declarations: [ImageUrlPipe],
  imports: [
    CommonModule
  ],
  exports: [ImageUrlPipe]
})
export class PipesModule {}
