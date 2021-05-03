import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../../common/services/navbar.service';
import { HttpUserService } from '../../services/http-user.service';

@Component({
  selector: 'flix-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  subscribe: Subscription | undefined;
  form: FormGroup;
  errors: Record<string, string>;

  constructor(
    public navbar: NavbarService,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private http: HttpUserService,
    private router: Router
  ) {
    this.navbar.hide();
    this.renderer.addClass(document.body, 'body-bg-color');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, this.checkString, Validators.minLength(3)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [
        '',
        [Validators.required, this.checkPasswords.bind(this)],
      ],
    });
  }

  get fullName() {
    return this.form?.get('name');
  }

  get nameError() {
    return this.fullName?.touched && this.fullName?.errors;
  }

  get email() {
    return this.form?.get('email');
  }

  get emailError() {
    return this.email?.touched && this.email?.errors;
  }

  get password() {
    return this.form?.get('password');
  }

  get passwdError() {
    return this.password?.touched && this.password?.errors;
  }

  get confirmPassword() {
    return this.form?.get('confirmPassword');
  }

  get cpasswdError() {
    return this.confirmPassword?.touched && this.confirmPassword?.errors;
  }

  checkString(group: FormGroup) {
    return /^[a-zA-Z]*$/g.test(group.value) ? null : { notastring: true };
  }

  checkPasswords(group: FormGroup) {
    return this.password?.value === this.confirmPassword?.value
      ? null
      : { notSame: true };
  }

  onSubmit() {
    this.subscribe = this.http.post(this.form.value, 'register').subscribe(
      () => {
        this.router.navigateByUrl('login');
      },
      (res) => {
        const { email, name, password } = res.originalError.error;

        if (email) {
          this.email?.setErrors({
            db: email,
          });
        }
        if (name) {
          this.fullName?.setErrors({
            db: name,
          });
        }
        if (password) {
          this.password?.setErrors({
            db: password,
          });
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
