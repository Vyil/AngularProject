import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.css']
})
export class EditdialogComponent implements OnInit {

  private user:User;
  private repeatedPass:string = '';

  constructor(private userService: UserService,
              private dialogRef:MatDialogRef<EditdialogComponent>,
              @Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit() {
    this.user = new User();
    this.getSelf();
  }

  editUserName(){
    console.log(this.user.userName)
    if(this.user.userName.length <2 ||!this.user.userName ){
      console.log('nope')
    }
    this.userService.editUserName(this.user._id,this.user).subscribe(res=>{
      this.dialogRef.close('Username Saved');
    });
  }

  editUserPassword(){
    if(!this.user.password || this.user.password.length <2){
      console.log('nope')
    }

  }

  getSelf(){
    this.userService.getByName().subscribe(
      res=>this.user._id = res._id);
  }

}
