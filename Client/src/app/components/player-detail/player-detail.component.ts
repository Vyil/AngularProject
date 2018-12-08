import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})


export class PlayerDetailComponent implements OnInit {

  @Input() user: User;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {    
    let id = this.route.snapshot.paramMap.get('_id');
    console.log(id)
    this.userService.getSpecific(id).subscribe(
      user=>this.user = user);
  }

}
