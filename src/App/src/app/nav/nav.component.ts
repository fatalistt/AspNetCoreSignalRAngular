import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NavComponent implements OnInit {
  @ViewChild('menu', { static: true }) menu: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.menu.nativeElement.classList.toggle("is-active");
  }
}
