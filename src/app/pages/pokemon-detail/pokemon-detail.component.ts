import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails } from 'src/app/models/pokemon-details';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  private id:number = 0;
  pokemonDetails: PokemonDetails = {} as PokemonDetails;
  

  constructor(
    private route:ActivatedRoute,
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( value =>
     this.id = Number(value.get('id'))
    );

    this.setValuesToComponent(this.id);
  }

  setValuesToComponent(id:number){
    this.pokeApiService.getPokemon(id).subscribe( value => {
      this.pokemonDetails = value;
    });
  }
}
