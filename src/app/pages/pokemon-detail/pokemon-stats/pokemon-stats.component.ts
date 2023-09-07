import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetails } from 'src/app/models/pokemon-details';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.css']
})
export class PokemonStatsComponent implements OnInit {
  

  @Input()
  id: number = 0;

  pokemonDetails: PokemonDetails = {} as PokemonDetails;

  constructor(private pokeApiService: PokeApiService) { }


  ngOnInit(): void {
    this.pokeApiService.getPokemon(this.id)
    .subscribe(data => this.pokemonDetails = data);
    
  }
}
