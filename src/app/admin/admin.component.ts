import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users = [];
  constructor(
    private user: UsersService
  ) { }

  ngOnInit() {
    this.user.get().subscribe(res => this.users = res['data']);
  }

}
