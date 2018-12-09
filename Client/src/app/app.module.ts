import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChampionsComponent } from './components/champions/champions.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HighscoreComponent } from './components/highscore/highscore.component';
import { PlayerlistComponent } from './components/playerlist/playerlist.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    ChampionsComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HighscoreComponent,
    PlayerlistComponent,
    PlayerDetailComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
