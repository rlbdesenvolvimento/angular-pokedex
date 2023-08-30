import { Component, OnInit } from '@angular/core';
import { PokeApiService } from './services/poke-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-pokedex';

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.getPokemons().subscribe((data: any) => {
      console.log(data);
    });
  }
}
