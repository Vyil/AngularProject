import { Component, OnInit, HostBinding } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.hero, form', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]
})
export class PlayerlistComponent implements OnInit {
  @HostBinding('@pageAnimations')
  public animatePage = true;
  playerTotal=-1;
  users: User[];
  selectedUsers:User[];

  constructor(private userService: UserService,private router: Router) { 
    
  }

  ngOnInit() {
    this.getAll();
    this.cloneUsers();
  }
  cloneUsers(){
    this.userService.getAll().subscribe(usr =>this.selectedUsers = usr)
  }

  getAll(){
    this.userService.getAll().subscribe(users =>this.users = users)
  }

  onSelect(user:User):void{
    this.router.navigate(['/players/'+user._id])
  }

  updateCriteria(criteria: string) {
    criteria = criteria ? criteria.trim() : '';

    this.selectedUsers= this.users.filter(user => user.userName.toLowerCase().includes(criteria.toLowerCase()));
    const newTotal = this.users.length;

    if (this.playerTotal !== newTotal) {
      this.playerTotal = newTotal;
    } else if (!criteria) {
      this.playerTotal = -1;
    }
  }

}
