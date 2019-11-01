import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'xcraft', loadChildren: () => import('../xcraft/xcraft.module').then(m => m.XcraftModule) },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent } //switch to not found page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
