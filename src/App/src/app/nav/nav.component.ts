import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
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
