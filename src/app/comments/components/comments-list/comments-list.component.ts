import { Component, Input } from '@angular/core';
import { Comment } from '../../types/comment.type';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'flix-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent {
  @Input('movieId') movieId: string;
  @Input('comments') comments: Comment[];

  faCommentDots = faCommentDots;

  updateCommentList(comments: Comment[]) {
    this.comments = comments;
  }
}
