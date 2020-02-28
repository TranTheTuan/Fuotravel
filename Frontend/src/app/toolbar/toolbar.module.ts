import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {LayoutModule} from '../layouts/layout.module';
import {MatMomentDateModule} from '@angular/material-moment-adapter';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    LayoutModule,
    MatMomentDateModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
