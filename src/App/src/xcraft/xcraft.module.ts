import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XcraftRoutingModule } from './xcraft-routing.module';
import { XcraftComponent } from './xcraft.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { NavComponent } from './nav/nav.component';
import { TechsComponent } from './techs/techs.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    XcraftComponent,
    BuildingsComponent,
    NavComponent,
    TechsComponent,
    HomeComponent],
  imports: [
    CommonModule,
    XcraftRoutingModule
  ]
})
export class XcraftModule { }
