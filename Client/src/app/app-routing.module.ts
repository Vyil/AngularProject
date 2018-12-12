import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { HighscoreComponent } from './components/highscore/highscore.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlayerlistComponent } from './components/playerlist/playerlist.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';

const routes: Routes = [
  {path: 'highscores', component: HighscoreComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'dashboard',component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'players',component: PlayerlistComponent},
  {path:'players/:_id',component:PlayerDetailComponent,canActivate:[AuthGuard]},
  {path: '' ,redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
