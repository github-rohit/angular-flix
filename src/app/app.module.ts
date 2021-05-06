import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { HttpService } from './common/services/http.service';
import { HttpMovieService } from './movie/services/http-movie.service';
import { MoviesListComponent } from './movie/components/movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie/components/movie-details/movie-details.component';
import { LoginComponent } from './user/components/login/login.component';
import { SignupComponent } from './user/components/signup/signup.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { MinToHourPipe } from './common/pipes/min-to-hour.pipe';
import { CommentsListComponent } from './comments/components/comments-list/comments-list.component';
import { CommentAddComponent } from './comments/components/comment-add/comment-add.component';
import { PaginationComponent } from './common/components/pagination/pagination.component';
import { SearchComponent } from './common/components/search/search.component';
import { AppErrorHandler } from './common/errors/app-error-handler';
import { RequestInterceptor } from './common/interceptor/request.interceptor';
import { EncodeUriStringPipe } from './common/pipes/encode-uri-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MoviesListComponent,
    MovieDetailsComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    MinToHourPipe,
    CommentsListComponent,
    CommentAddComponent,
    PaginationComponent,
    SearchComponent,
    EncodeUriStringPipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    HttpService,
    HttpMovieService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
