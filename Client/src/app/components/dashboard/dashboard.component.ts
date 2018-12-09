import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/message';
import { Champion } from 'src/app/models/champion';
import { ChampionService } from 'src/app/services/champion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:User;
  messages:Message[];
  champions:Champion[];
  newChampion:Champion;

  constructor(
    private userService:UserService,
    private messageService:MessageService,
    private champService: ChampionService
  ) { }

  ngOnInit() {
    this.getByName();
    this.getMessageByName();
    this.getChampions();
    this.newChampion = new Champion();
  }

  getByName(){
    this.userService.getByName().subscribe(
      user=>this.user = user);
  }

  getMessageByName(){
    this.messageService.getMessageByName().subscribe(
      messages=>this.messages= messages);
  }

  getChampions(){
    this.champService.getPlayerChampionsDashboard().subscribe(
      champions=>this.champions=champions);
  }

  addChampion(){
    console.log('Added: '+this.newChampion.name)
    this.champService.createNewChampions(this.newChampion).subscribe();
    location.reload();
  }

}
