import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { UnauthorizedError } from './../errors/unauthorized-error';
import { AppError } from './../errors/app-error';
import { NotFoundError } from './../errors/not-found-error';
import { BadInput } from './../errors/bad-input';

@Injectable()
export class HttpService {
  constructor(@Inject(String) private url: string, private http: HttpClient) {}

  getAll(query?: string) {
    return this.http.get(`${this.url}${query || ''}`).pipe(
      map((response: any) => response),
      catchError((error) => {
        return error;
      })
    );
  }

  getById(id: string) {
    return this.http.get(`${this.url}/id/${id}`).pipe(
      map((response: any) => response),
      catchError((error) => {
        return error;
      })
    );
  }

  post(resource?: Record<string, any>, url = '') {
    return this.http.post(`${this.url}${url}`, resource).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return observableThrowError(new BadInput(error));
    }

    if (error.status === 401) {
      return observableThrowError(new UnauthorizedError(error));
    }

    if (error.status === 404) {
      return observableThrowError(new NotFoundError());
    }

    return observableThrowError(new AppError(error));
  }
}
