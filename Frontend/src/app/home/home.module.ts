import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {PipesModule} from '../pipes/pipes.module';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        ToolbarModule,
        PipesModule,
        MatIconModule
    ]
})
export class HomeModule {
}
