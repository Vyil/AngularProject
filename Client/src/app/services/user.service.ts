import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private URL: string = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(this.URL,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
      });
  }

  getSpecific(id:string): Observable<User>{
    return this.http.get<User>(this.URL+'/'+id)
  }

  getByName(): Observable<User>{
    return this.http.get<User>(this.URL+'?getSelf=yes',{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }

  editUserName(id:string,user:User):Observable<User>{
    return this.http.put<User>(this.URL+'/'+id+'?edit=name',user,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }

  deleteUser(id:string){
    return this.http.delete<User>(this.URL+'/'+id,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }

  increaseGold(){
    return this.http.post<User>(this.URL+'/gold',null,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }
}
