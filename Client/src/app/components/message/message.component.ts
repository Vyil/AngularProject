import { Component, OnInit, Input, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  private message:Message;
  @Input() user:User;

  constructor(
    private messageService:MessageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.message=new Message();
  }

  submitMessage(){
    this.message.recipient=this.user._id;
    this.messageService.submitMessage(this.message).subscribe(
      response=>{
        this.router.navigate(['/players/'+this.user._id]);
        console.log('Succes: '+response)
      })
  }

}
