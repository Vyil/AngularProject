import { Component, OnInit, Inject } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Message } from '../../models/message';
import { ActivatedRoute } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-messagedialog',
  templateUrl: './messagedialog.component.html',
  styleUrls: ['./messagedialog.component.css']
})
export class MessagedialogComponent implements OnInit {

  private message:Message;

  constructor(private messageService:MessageService,
            private route: ActivatedRoute,
            private dialogRef:MatDialogRef<MessagedialogComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.message=new Message();
  }

  sendMessage(){
    this.message.recipient=this.data.usr;
    this.messageService.submitMessage(this.message).subscribe(
      response=>{
        this.dialogRef.close('Message Saved');
      })
  }

}
