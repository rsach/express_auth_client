import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {UsersService} from '../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: FormGroup;



  // Form Error Initial Object
  formErrors = {
    // 'name': '',
    'email': '',
    'password': ''
  };

  // Form Error Object
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Please enter a valid Email',
      'maxlength': 'cannot exceed more than 100 char.'
    },
    'password': {
      'required': 'password is required',
      'minlength': 'more than 6 char.',
      'maxlength': 'cannot exceed more than 500 char.'

    }
  };


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private users: UsersService
  ) { }

  ngOnInit() {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
    });

    this.login.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now


  }


  onSubmit() {
    if (!this.login.valid) {
      return;
    }

    this.auth.login(this.login.value).subscribe(res => {
      localStorage.setItem('access_token', res['data']['access_token']);
      this.users.access_token = res['data']['access_token'];
      this.auth.isLoggedIn = true;
      this.router.navigate(['admin']);

    }, err => {
      this.formErrors.password = err.error.message;
    });

  }


  // Reactive form Error Detection
  onValueChanged(data?: any) {
    if (!this.login) { return; }
    const form = this. login;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


}
