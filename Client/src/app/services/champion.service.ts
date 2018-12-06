import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Champion } from '../models/champion';

@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  private URL: string = 'http://localhost:3000/api/champion';
  constructor(private http: HttpClient) { }

  //Methods
  getAll(): Observable<Champion[]>{
    return this.http.get<Champion[]>(this.URL);
  }
}
