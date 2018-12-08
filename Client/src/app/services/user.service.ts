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
    return this.http.get<User[]>(this.URL);
  }

  getSpecific(id:string): Observable<User>{
    return this.http.get<User>(this.URL+'/'+id)
  }
}
