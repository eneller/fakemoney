import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, Router, NavigationEnd } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	NgbNav,
	NgbNavItem,
	NgbNavItemRole,
	NgbNavLinkBase,
} from '@ng-bootstrap/ng-bootstrap/nav';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbModule, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkBase, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App implements OnInit{
  protected readonly title = signal('client');
  active = '/';

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() =>{
      this.active = this.router.url;
      console.log(this.active);
    });
  }

}
