import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../../common/services/navbar.service';
import { HttpUserService } from '../../services/http-user.service';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'flix-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  subscribe: Subscription;
  returnUrl: string | null;
  form: FormGroup;

  constructor(
    public navbar: NavbarService,
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpUserService,
    private auth: UserAuthService
  ) {
    this.navbar.hide();
    this.renderer.addClass(document.body, 'body-bg-color');
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get(
      'returnUrl'
    );
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get emailError() {
    return this.email?.touched && this.email?.errors;
  }

  get password() {
    return this.form.get('password');
  }

  get passwordError() {
    return this.password?.touched && this.password?.errors;
  }

  ngOnInit(): void {}

  routeAfterLogin() {
    if (this.returnUrl) {
      // this.router.navigateByUrl(this.returnUrl);
    } else {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.subscribe = this.http.post(this.form.value, 'login').subscribe(
      (response: any) => {
        const { auth_token } = response;
        this.auth.setToken(auth_token);
        this.routeAfterLogin();
      },
      (res) => {
        if (res.originalError.error) {
          this.form.setErrors({ error: true });
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.navbar.show();
    this.renderer.removeClass(document.body, 'body-bg-color');
    this.subscribe?.unsubscribe();
  }
}
