import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Champion } from '../models/champion';



@Injectable({
  providedIn: 'root'
})


export class ChampionService {

  private URL: string = 'http://localhost:3000/api/champion';
  private level = {
    "upgrade":"level"
  }
  private quality = {
    "upgrade":"quality"
  }

  
  constructor(private http: HttpClient) { }

  //Methods
  getAll(): Observable<Champion[]>{
    return this.http.get<Champion[]>(this.URL,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }

  getPlayerChampions(id): Observable<Champion[]>{
    return this.http.get<Champion[]>(this.URL+'/user/'+id,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }

  getPlayerChampionsDashboard():Observable<Champion[]>{
    return this.http.get<Champion[]>(this.URL+'?getByToken=yes',{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }

  createNewChampions(champion:Champion): Observable<Champion>{
    return this.http.post<Champion>(this.URL,champion,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }

  upgradeChampionLevel(id:string):Observable<Champion>{
    return this.http.put<Champion>(this.URL+'/'+id,this.level,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN'),
        'Content-Type': 'application/json'
      }
    });
  }

  upgradeChampionQuality(id:string):Observable<Champion>{
    return this.http.put<Champion>(this.URL+'/'+id+'?upgrade=quality',this.quality,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN'),
        'Content-Type': 'application/json'
      }
    });
  }

  deleteChampion(id:string):Observable<Champion>{
    return this.http.delete<Champion>(this.URL+'/'+id,{
      headers:{
        'Authorization':'Bearer '+window.localStorage.getItem('APITOKEN')
      }
    });
  }
}