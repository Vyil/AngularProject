import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed = false;

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  logOutUser():void{
    console.log('logout user called'+localStorage.getItem('APITOKEN'))
    this.authService.logOutUser();
    location.reload(true);
  }

  isLogged(){
    if(window.localStorage.getItem('APITOKEN')){
      return true;
    }
    return false;
  }

}
