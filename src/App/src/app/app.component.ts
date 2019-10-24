import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header><h1>{{title}}</h1></header>
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  title = 'ASP.Net Core + SignalR + Angular';
}
