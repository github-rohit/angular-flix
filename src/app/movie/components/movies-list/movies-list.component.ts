import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/common/services/search.service';
import { HttpMovieService } from '../../services/http-movie.service';
import { MovieListRes } from '../../types/movie-list.type';

@Component({
  selector: 'flix-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  subscribe: Subscription | undefined;
  public movies: MovieListRes | undefined;
  public currentPage: number = 1;
  public queryText: string;
  public loading = true;

  constructor(
    public http: HttpMovieService,
    private search: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    search.show();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      const { page } = queryParams;
      const query = this.query(queryParams);
      this.queryText = this.getQueryText(queryParams);
      this.currentPage = +page || 1;
      this.fetch(query);
    });
  }

  private getQueryText(queryParams: Params) {
    const { genre, cast, text } = queryParams;

    return genre || cast || text || '';
  }

  private query({ page, genre, cast, text }: Params) {
    const query: string[] = [];
    // const query = page ? `/search?page=${page}` : '';

    if (genre) {
      query.push(`genre=${genre}`);
    }

    if (cast) {
      query.push(`cast=${cast}`);
    }

    if (text) {
      query.push(`text=${text}`);
    }

    if (page) {
      query.push(`page=${Math.max(0, page - 1)}`);
    }

    return query.length ? `search?${query.join('&')}` : '';
  }

  private fetch(query: string) {
    this.loading = true;
    this.subscribe = this.http.getAll(query).subscribe((res: MovieListRes) => {
      this.movies = res;
      this.loading = false;
    });
  }

  onPageChange(page: number) {
    const search: Record<string, string> = {};
    const searchParams = new URL(window.location.href).searchParams;
    searchParams.set('page', page.toString());

    searchParams.forEach((value, key) => {
      search[key] = value;
    });

    this.router.navigate([], {
      queryParams: search,
    });
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
    this.search.hide();
  }
}
