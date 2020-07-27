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
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {PipesModule} from '../../utility/pipes/pipes.module';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NotificationSheetComponent } from './notification-sheet/notification-sheet.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PlanCreateComponent} from './plan-create/plan-create.component';
import {MatStepperModule} from '@angular/material/stepper';
import {TagModule} from '../tag/tag.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [ToolbarComponent, NotificationSheetComponent, PlanCreateComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    PipesModule,
    MatBadgeModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatListModule,
    MatTooltipModule,
    MatStepperModule,
    TagModule,
    MatDatepickerModule,
    MatSnackBarModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {
}
