import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:User;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit() {
    this.getByName();
  }

  getByName(){
    this.userService.getByName().subscribe(
      user=>this.user = user);
  }

}
