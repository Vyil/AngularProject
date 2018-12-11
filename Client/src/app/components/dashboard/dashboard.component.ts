import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/message';
import { Champion } from 'src/app/models/champion';
import { ChampionService } from 'src/app/services/champion.service';
import { MatDialog, MatSnackBarConfig } from '@angular/material';
import { EditdialogComponent } from '../editdialog/editdialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { riddles , Riddle} from '../../riddles';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  user:User;
messages:Message[];
  champions:Champion[];
  newChampion:Champion;
  riddle:Riddle;
  answer:string;

  constructor(
    private userService:UserService,
    private messageService:MessageService,
    private champService: ChampionService,
    private dialog: MatDialog,
    private authService:AuthService,
    private router: Router,
    private snackBar: MatSnackBar
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
    this.champService.createNewChampions(this.newChampion).subscribe(res=>{
      this.getChampions();
    });
  }

  upgradeLevel(id:string){
    this.champService.upgradeChampionLevel(id).subscribe(res=>{
      this.getChampions();
      this.getByName();
    });
  }

  upgradeQuality(id:string){
    this.champService.upgradeChampionQuality(id).subscribe(res=>{
      this.getChampions();
      this.getByName();
    });
  }

  deleteMessage(id:string){
    this.messageService.deleteMessage(id).subscribe(res=>{
      this.getMessageByName();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditdialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getByName();
    });
  }

  deleteAccount(){
    if(confirm('Are you sure you want to delete the account?')){
      this.userService.deleteUser(this.user._id).subscribe(res=>{
        this.authService.logOutUser();
        this.router.navigate(['/home'])
      });
    }
  }

  getRandomRiddle(){
    this.riddle = riddles[Math.floor(Math.random()*riddles.length)];
    console.log(this.riddle.question);
  }

  checkRiddleAnswer(){
    if(this.riddle.guess.toLocaleLowerCase() == this.riddle.answer){
      
      this.userService.increaseGold().subscribe(res=>{
        this.snackBar.open('The riddle was correctly guessed!','Undo',{
          duration:3000
        });
        this.riddle = null;
        this.getByName();
      });      
    } else {
      this.snackBar.open('The riddle was not guessed!','Undo',{
        duration:3000
      });  
    }
  }
}
