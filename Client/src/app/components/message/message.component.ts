import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  private message:Message;
  @Input() user:User;

  constructor(
    private messageService:MessageService
  ) { }

  ngOnInit() {
    this.message=new Message();
  }

  submitMessage(){
    this.message.recipient=this.user._id;
    this.messageService.submitMessage(this.message).subscribe(
      response=>{
        console.log('Succes: '+response)
      })
  }

}
