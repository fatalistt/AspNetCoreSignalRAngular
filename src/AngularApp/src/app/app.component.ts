import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header><h1>{{title}}</h1></header>
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'ASP.Net Core + SignalR + Angular';
}
