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
import { MatDialogModule,MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditdialogComponent } from './components/editdialog/editdialog.component';
import { MessagedialogComponent } from './components/messagedialog/messagedialog.component';
import { MatIconModule } from "@angular/material/icon";

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
    MessageComponent,    
    EditdialogComponent, MessagedialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  entryComponents:[
    EditdialogComponent,
    MessagedialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
