import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../../services/champion.service';
import { Champion } from '../../models/champion';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {

  champion: Champion = {
    id:'1234823fcn8934',
    name:'Bolg',
    level:2,
    quality:'Bronze'
  }

  constructor() { }

  ngOnInit() {
  }

}
