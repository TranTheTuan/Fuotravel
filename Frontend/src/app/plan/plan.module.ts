import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PlanComponent } from './plan.component';
import { MatButtonModule } from '@angular/material/button';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {PipesModule} from '../pipes/pipes.module';
import { MemberComponent } from './member/member.component';
import {PostModule} from '../post/post.module';
import {RequestComponent} from './request/request.component';
import {CommentModule} from '../comment/comment.module';
import {
  MatProgressBarModule,
  MatCardModule,
  MatDividerModule,
  MatSnackBarModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule,
  MatFormFieldModule, MatDatepickerModule, MatInputModule,
} from '@angular/material';
import {InteractionModule} from '../interaction/interaction.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import { HereMapComponent } from './here-map/here-map.component';
import {FlexModule} from '@angular/flex-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PlanComponent,
    RequestComponent,
    MemberComponent,
    MapComponent,
    HereMapComponent,
  ],
    imports: [
        CommonModule,
        PlanRoutingModule,
        ToolbarModule,
        PipesModule,
        MatButtonModule,
        MatTabsModule,
        PostModule,
        MatMenuModule,
        MatIconModule,
        MatSnackBarModule,
        MatDividerModule,
        CommentModule,
        MatCardModule,
        MatProgressBarModule,
        MatFormFieldModule,
        InteractionModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatInputModule,
        LeafletModule.forRoot(),
        FlexModule,
        NgbModule
    ],
})
export class PlanModule { }
