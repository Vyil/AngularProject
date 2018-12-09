import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private URL: string = 'http://localhost:3000/api/message';

  constructor(private http: HttpClient) { }

  getMessageByUser(){
    
  }
}
