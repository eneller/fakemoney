import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	NgbNav,
	NgbNavItem,
	NgbNavItemRole,
	NgbNavLinkBase,
} from '@ng-bootstrap/ng-bootstrap/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbModule, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkBase, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('client');
  //FIXME nav jumping back to 1 after reload
  active = 1;
}
