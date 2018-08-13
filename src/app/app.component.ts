import {Component, OnInit} from '@angular/core';
import {UsersService} from './users/users.service';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ab';
  constructor(
    private users: UsersService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.users.access_token = localStorage.getItem('access_token');
    if (this.users.access_token) {
      this.auth.isLoggedIn = true;
    }

  }
}
