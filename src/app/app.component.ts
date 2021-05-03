import { Component } from '@angular/core';
import { NavbarService } from './common/services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public navbar: NavbarService) {}
}
