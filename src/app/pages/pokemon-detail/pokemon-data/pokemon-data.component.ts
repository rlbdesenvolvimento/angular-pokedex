import { Component, Input } from '@angular/core';
import { PokemonDetails } from 'src/app/models/pokemon-details';

@Component({
  selector: 'app-pokemon-data',
  templateUrl: './pokemon-data.component.html',
  styleUrls: ['./pokemon-data.component.css']
})

export class PokemonDataComponent {
  @Input() 
  pokemonDetails: PokemonDetails = {} as PokemonDetails;

  
}
