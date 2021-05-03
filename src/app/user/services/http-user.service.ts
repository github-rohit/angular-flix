import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/common/services/http.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpUserService extends HttpService {
  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/user/`, http);
  }
}
