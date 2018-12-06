import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../../services/champion.service';
import { Champion } from '../../models/champion';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {

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
