import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostComponent} from './post.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommentModule} from '../comment/comment.module';
import {MatDividerModule} from '@angular/material/divider';
import {PostCreateComponent} from './post-create/post-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {NgImageSliderModule} from 'ng-image-slider';
import {PipesModule} from '../../utility/pipes/pipes.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [PostComponent, PostCreateComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        CommentModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatInputModule,
        NgImageSliderModule,
        PipesModule,
        MatProgressSpinnerModule
    ],
  exports: [PostComponent]
})
export class PostModule {
}
