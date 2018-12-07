import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user:User;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.user = new User();
    console.log(localStorage.getItem('APITOKEN'))
  }

  loginUser(): void{
    this.authService.loginUser(this.user).subscribe(response =>{
      console.log('Succes')
      localStorage.setItem('APITOKEN',response.token);
      location.replace('/champions');
    },error=>{
      if(error){
        console.log(error);
      }
  })
}

}
