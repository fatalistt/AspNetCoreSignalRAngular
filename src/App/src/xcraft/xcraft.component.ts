import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'xcraft-root',
  template: `
    <xcraft-nav></xcraft-nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./xcraft.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class XcraftComponent { }
