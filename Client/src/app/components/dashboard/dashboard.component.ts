import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:User;
  messages:Message[];

  constructor(
    private userService:UserService,
    private messageService:MessageService
  ) { }

  ngOnInit() {
    this.getByName();
    this.getMessageByName();
  }

  getByName(){
    this.userService.getByName().subscribe(
      user=>this.user = user);
  }

  getMessageByName(){
    this.messageService.getMessageByName().subscribe(
      messages=>this.messages= messages);
  }

}
