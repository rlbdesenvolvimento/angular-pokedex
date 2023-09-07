import { Component, Input } from '@angular/core';
import { PokemonDetails } from 'src/app/models/pokemon-details';

@Component({
  selector: 'app-pokemon-status',
  templateUrl: './pokemon-status.component.html',
  styleUrls: ['./pokemon-status.component.css']
})
export class PokemonStatusComponent {

  @Input() 
  pokemonDetails: PokemonDetails = {} as PokemonDetails;
  
}
