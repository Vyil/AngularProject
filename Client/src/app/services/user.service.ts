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
  private loginURL : string = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }


}
