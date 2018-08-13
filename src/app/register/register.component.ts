import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService, Validator} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {



  register: FormGroup;



  // Form Error Initial Object
  formErrors = {
    // 'name': '',
    'email': '',
    'password': '',
    'confirm_password': ''
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
      'maxlength': 'cannot exceed more than 40 char.'

    },
    'confirm_password': {
      'required': 'password is required',
      'minlength': 'more than 6 char.',
      'maxlength': 'cannot exceed more than 40 char.',

    }
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.register = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    }, {validator: Validator.checkPasswords});

    this.register.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now

  }


  // Reactive form Error Detection
  onValueChanged(data?: any) {
    if (!this.register) { return; }

    const form = this. register;

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


    if (this.register.errors && this.register.errors.notSame)  {


      this.formErrors.confirm_password = `password and confirm password aren't same`;
    }


  }

  onSubmit() {

    if (!this.register.valid) {


        return;
    }

    this.auth.register({email: this.register.value.email, password: this.register.value.password}).subscribe(res => {
      this.router.navigate(['login']);
    }, err => {
      this.formErrors.confirm_password = err.error.message;

    });

  }


}
