import {
  Component,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpMovieService } from 'src/app/movie/services/http-movie.service';
import { UserAuthService } from 'src/app/user/services/user-auth.service';
import {
  faExclamationCircle,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { Comment } from '../../types/comment.type';

@Component({
  selector: 'flix-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss'],
})
export class CommentAddComponent implements OnDestroy {
  @Input('movieId') movieId: string;
  @Output('onSuccess') onSuccess = new EventEmitter<Comment[]>();

  subscribe: Subscription;
  user: any;
  form: FormGroup;
  error: boolean = false;
  success: boolean = false;
  loading: boolean = false;
  faExclamation = faExclamationCircle;
  faThumbsUp = faThumbsUp;

  constructor(
    private auth: UserAuthService,
    private fb: FormBuilder,
    private http: HttpMovieService
  ) {
    this.user = this.auth.user;
    this.form = this.fb.group({
      comment: ['', [Validators.required]],
    });
  }

  addComment() {
    if (this.form.invalid) {
      return;
    }

    const comment = {
      ...this.form.value,
      movie_id: this.movieId,
    };

    this.loading = true;
    this.error = false;
    this.success = false;

    this.subscribe = this.http.post(comment, 'comment').subscribe(
      (res: any) => {
        this.form.get('comment')?.setValue('');
        this.loading = false;
        this.success = true;
        this.onSuccess.emit(res.comments);
      },
      (error: any) => {
        this.loading = false;
        this.error = true;
      }
    );
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }
}
