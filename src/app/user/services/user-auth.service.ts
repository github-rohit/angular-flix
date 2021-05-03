import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  tokenKey = 'x-token';

  get token() {
    return localStorage.getItem(this.tokenKey) || '';
  }

  get user(): any {
    const token = this.token;
    let returnObj;

    if (token) {
      const jwt = new JwtHelperService();
      returnObj = jwt.decodeToken(token);
    } else {
      returnObj = {};
    }

    return returnObj;
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn() {
    const jwtHelper = new JwtHelperService();
    return this.token && jwtHelper.isTokenExpired(this.token);
  }
}
