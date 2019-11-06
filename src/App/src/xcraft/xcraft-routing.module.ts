import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinesComponent } from './mines/mines.component';
import { XcraftComponent } from './xcraft.component';
import { TechsComponent } from './techs/techs.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: XcraftComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'mines', component: MinesComponent },
      { path: 'techs', component: TechsComponent },
      { path: '', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XcraftRoutingModule { }
