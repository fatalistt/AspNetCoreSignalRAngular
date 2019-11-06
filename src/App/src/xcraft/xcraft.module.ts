import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { XcraftRoutingModule } from './xcraft-routing.module';
import { XcraftComponent } from './xcraft.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { MinesComponent } from './mines/mines.component';
import { MineComponent } from './mines/mine.component';
import { TechsComponent } from './techs/techs.component';


@NgModule({
  declarations: [
    XcraftComponent,
    NavComponent,
    HomeComponent,
    MinesComponent,
    MineComponent,
    TechsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    XcraftRoutingModule
  ]
})
export class XcraftModule { }
