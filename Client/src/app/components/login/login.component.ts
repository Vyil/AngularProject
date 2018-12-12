import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user:User;

  constructor(private authService:AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = new User();
    console.log(localStorage.getItem('APITOKEN'))
  }

  loginUser(): void{
    this.authService.loginUser(this.user).subscribe(response =>{
      localStorage.setItem('APITOKEN',response.token);
      location.replace('/dashboard');
    },error=>{
      if(error){
        this.snackBar.open('Something went wrong, are you sure your username/password is correct?','Undo',{
          duration:5000
        });
      }
  })
}

}
