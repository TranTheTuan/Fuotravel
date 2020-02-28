import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommentModule} from "../comment/comment.module";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommentModule,
    MatDividerModule
  ],
  exports: [PostComponent]
})
export class PostModule { }
