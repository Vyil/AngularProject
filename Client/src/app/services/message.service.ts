import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private URL: string = 'http://localhost:3000/api/message';

  constructor(private http: HttpClient) { }

  getMessageByName(){
    return this.http.get<Message[]>(this.URL,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }

  getMessageById(id:string){
    return this.http.get<Message[]>(this.URL+'?id='+id,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }

  submitMessage(message:Message){
    return this.http.post<Message>(this.URL,message,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }

  deleteMessage(id:string){
    return this.http.delete<Message>(this.URL+'/'+id,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }
}
