import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'quiz',
    component:QuizComponent,
    pathMatch: 'full'
  },
  {
    path:'pokemon-details/:id',
    component:PokemonDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
