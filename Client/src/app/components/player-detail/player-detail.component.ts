import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ChampionService } from 'src/app/services/champion.service';
import { Champion } from 'src/app/models/champion';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/message';
import { MessagedialogComponent } from '../messagedialog/messagedialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})


export class PlayerDetailComponent implements OnInit {

  user: User;
  champions: Champion[];
  currentUser: String;
  @Input() messages: Message[];

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private userService: UserService,
              private champService: ChampionService,
              private messageService:MessageService
              ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('_id'); 
    //Get user
    this.getSpecificUser(id);

    //Get user's champions
    this.getPlayerChampions(id);

    //Get user's messages
    this.getUserMessages(id);

    this.getCurrentUser();
  }
  

  getPlayerChampions(id){
    this.champService.getPlayerChampions(id).subscribe(
      champions=>this.champions=champions);
  }

  getSpecificUser(id){
    this.userService.getSpecific(id).subscribe(
      user=>this.user = user);
  }

  getUserMessages(id){
    this.messageService.getMessageById(id).subscribe(
      messages=>this.messages=messages);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MessagedialogComponent, {
      width: '500px',
      data: {
        usr: this.route.snapshot.paramMap.get('_id')
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getUserMessages(this.user._id);
    });
  }

  getCurrentUser(){
    this.userService.getByName().subscribe(
      res=>this.currentUser=res._id)
  }

  deleteMessage(id:string){
    this.messageService.deleteMessage(id).subscribe(res=>{
      this.getUserMessages(this.route.snapshot.paramMap.get('_id'));
    });
  }
}
