import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { HttpMovieService } from '../../services/http-movie.service';
import { MovieDetailsWithComment } from '../../types/movie-list.type';

interface MovieDetails {
  movie: MovieDetailsWithComment;
}

@Component({
  selector: 'flix-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  subscribe: Subscription | undefined;
  movie: MovieDetailsWithComment | undefined;
  movieId: string | null;
  faTrophy = faTrophy;

  constructor(public http: HttpMovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');

    if (this.movieId) {
      this.subscribe = this.http
        .getById(this.movieId)
        .subscribe((res: MovieDetails) => {
          const { movie } = res;
          this.movie = movie;
        });
    }
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }
}
