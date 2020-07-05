import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentComponent} from './comment.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {CommentFormComponent} from './comment-form/comment-form.component';
import {ReplyFormComponent} from './reply-form/reply-form.component';
import {PipesModule} from '../pipes/pipes.module';
import {MatListModule} from '@angular/material';
import {NgImageSliderModule} from 'ng-image-slider';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [CommentComponent, CommentFormComponent, ReplyFormComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        PipesModule,
        MatListModule,
        NgImageSliderModule,
        RouterModule
    ],
  exports: [CommentComponent]
})
export class CommentModule {
}
