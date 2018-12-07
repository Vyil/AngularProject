import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string;

  private loginURL : string = 'http://localhost:3000/api/login';
  private URL: string = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }

    //Methods
    loginUser(user:User): any{
      return this.http.post(this.loginURL, user)
      .pipe(
        tap((response:any)=>(console.log(response.token)))
      )
        
    }

    logOutUser(){
      localStorage.removeItem('APITOKEN');
    }
  
    registerUser(user:User):Observable<User>{
      return this.http.post<User>(this.URL,user).pipe(
        tap((user:User)=>console.log(user.id)),
        catchError(this.registerUser)
      )
    }

    getToken(){
      return this.token;
    }
}
