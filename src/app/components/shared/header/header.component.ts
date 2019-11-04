import { Component, OnInit } from '@angular/core';
import NavLinks from '../../../json/navbar.json';
import NavLink from 'src/app/model/NavLink.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNavbarCollapsed = true;
  isLoggedIn = false;
  beforeLogin: Array<NavLink> = [];
  afterLogin: Array<NavLink> = [];

  constructor() {
    NavLinks.beforeLogin.forEach(link => {
      this.beforeLogin.push(
        new NavLink(link.title, link.url, link.icon)
      );
    });

    NavLinks.afterLogin.forEach(link => {
      this.afterLogin.push(
        new NavLink(link.title, link.url, link.icon)
      );
    });
  }

  ngOnInit() {
  }

}
