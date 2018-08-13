import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  url = 'http://18.223.69.119:4000/'
  constructor(
    private http: HttpClient
  ) { }

  register(body) {
    return this.http.post(`${this.url}register`, body);
  }

  login(body) {
    return this.http.post(`${this.url}login`, body);
  }
}


export  class Validator {
  static checkPasswords(group: FormGroup) {
    const password = group.value.password;
    const confirm_password = group.value.confirm_password;

    return password === confirm_password ? null : { notSame: true };
  }

}
