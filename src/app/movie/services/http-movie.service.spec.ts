import { TestBed } from '@angular/core/testing';

import { HttpMovieService } from './http-movie.service';

describe('HttpMovieService', () => {
  let service: HttpMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
