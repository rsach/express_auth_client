import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'http://18.223.69.119:4000/'

  access_token;
  constructor(
    private http: HttpClient
  ) {
    this.access_token = localStorage.getItem('access_token');
  }

  get() {
    return this.http.get(`${this.url}users`, {headers: {'Authorization':  `Bearer ${this.access_token}` }});
  }
}
