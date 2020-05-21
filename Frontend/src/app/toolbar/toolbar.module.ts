import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {LayoutModule} from '../layouts/layout.module';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from "@angular/material/menu";
import {PipesModule} from "../pipes/pipes.module";


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    LayoutModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    PipesModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {
}
