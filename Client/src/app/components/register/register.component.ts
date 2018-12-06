import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user:User;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.user = new User();
  }

  register(){
    console.log('Registered: ');
    this.userService.registerUser(this.user).subscribe(response =>{
      console.log('Succes!');
    },error=>{
      if(error){
        console.log(error);
      }
    })
  }

}
