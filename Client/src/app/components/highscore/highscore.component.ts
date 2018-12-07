import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../../services/champion.service';
import { Champion } from '../../models/champion';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {

  champions: Champion [];

  constructor(private champService: ChampionService) { }

  ngOnInit() {
    this.getAllChampions()
  }

  getAllChampions(): void{
    this.champService.getAll()
    .subscribe(champions =>this.champions = champions);
  }

}
