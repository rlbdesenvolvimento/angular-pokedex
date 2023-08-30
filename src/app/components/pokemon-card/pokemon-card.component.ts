import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonDetails } from 'src/app/models/pokemon-details';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input()
  pokemon: Pokemon = {} as Pokemon;

  pokemonDetails: PokemonDetails = {} as PokemonDetails;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.getPokemonsDetails(this.pokemon.url).subscribe((data: any) => {
      this.pokemonDetails = data;
      console.log(this.pokemonDetails);
    });
  }
}
