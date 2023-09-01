import { Component, Input, Renderer2 } from '@angular/core';
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

  constructor(private pokeApiService: PokeApiService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.pokeApiService.getPokemonsDetails(this.pokemon.url).subscribe((data: any) => {
      this.pokemonDetails = data;
      console.log(this.pokemonDetails);
    });

    const elemento = this.renderer.selectRootElement('card-front');
    console.log(elemento);
    this.renderer.addClass(elemento, this.pokemonDetails.types[0].type.name);
  }
}
