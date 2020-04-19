import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractionComponent } from './interaction.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
  declarations: [InteractionComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    FlexLayoutModule
  ],
  exports: [InteractionComponent]
})
export class InteractionModule { }
