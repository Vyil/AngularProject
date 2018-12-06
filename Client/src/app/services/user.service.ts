import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private URL: string = 'http://localhost:3000/api/user';
  private loginURL : string = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }

  //Methods
  loginUser(user:User): any{
    return this.http.post(this.loginURL, user);
  }

  registerUser(user:User):Observable<User>{
    console.log('userservice registeruser '+JSON.stringify(user))
    return this.http.post<User>(this.URL,user, httpOptions).pipe(
      tap((user:User)=>console.log(user.id)),
      catchError(this.registerUser)
    )
  }
}
