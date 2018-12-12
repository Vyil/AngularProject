import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user:User;

  constructor(private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = new User();
  }

  register(){
    console.log('Registered: ');
    this.authService.registerUser(this.user).subscribe(response =>{
      location.replace('/login');
    },error=>{
      if(error){
        this.snackBar.open('Something went wrong: ','Undo',{
          duration:5000
        });
      }
    })
  }

}
