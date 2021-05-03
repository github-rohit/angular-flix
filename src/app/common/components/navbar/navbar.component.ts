import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUserService } from 'src/app/user/services/http-user.service';
import { UserAuthService } from 'src/app/user/services/user-auth.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'flix-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  user: any;
  constructor(
    public search: SearchService,
    private auth: UserAuthService,
    private http: HttpUserService,
    private router: Router
  ) {
    this.user = auth.user;
  }

  onLogout() {
    this.http.post(undefined, 'logout').subscribe(
      () => {
        this.router.navigate(['login']);
      },
      () => {
        this.router.navigate(['login']);
      }
    );
    this.auth.removeToken();
  }
}
