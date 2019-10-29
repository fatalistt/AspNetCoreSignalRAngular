import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NavComponent {
  @ViewChild('menu', { static: true }) menu: ElementRef<HTMLDivElement>;

  toggleMenu(): void {
    this.menu.nativeElement.classList.toggle("is-active");
  }
}
