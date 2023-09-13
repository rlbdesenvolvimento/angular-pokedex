import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemonCardComponent,
    NavBarComponent,
    QuizComponent,
    PokemonDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    TabViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
