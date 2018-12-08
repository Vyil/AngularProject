import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css']
})
export class PlayerlistComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.userService.getAll().subscribe(users =>this.users = users)
  }

  onSelect(user:User):void{
    console.log('clicked: '+ user.userName)
    this.router.navigate(['/players/'+user._id])
    //location.replace('/players/'+user._id)
  }

}
