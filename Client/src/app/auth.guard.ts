import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(){
    if(localStorage.getItem('APITOKEN')){
      return true;
    } 
    this.router.navigate(['/login']);
    return false;   
  }
}
