import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	NgbNavContent,
	NgbNav,
	NgbNavItem,
	NgbNavItemRole,
	NgbNavLinkButton,
	NgbNavLinkBase,
	NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbModule, NgbNavContent, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase, NgbNavOutlet],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('client');
}
