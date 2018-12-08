import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ChampionService } from 'src/app/services/champion.service';
import { Champion } from 'src/app/models/champion';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})


export class PlayerDetailComponent implements OnInit {

  user: User;
  champions: Champion[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private champService: ChampionService) { }

  ngOnInit() {    
    let id = this.route.snapshot.paramMap.get('_id');
    //Get user
    this.userService.getSpecific(id).subscribe(
      user=>this.user = user);

    //Get user's champions
    this.champService.getPlayerChampions(id).subscribe(
      champions=>this.champions=champions);
  }

}
