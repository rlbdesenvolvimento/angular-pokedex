import { Component, Input, Renderer2 } from '@angular/core';
import { TypeEnum, TypeEnumIndex } from 'src/app/models/enums/type-enum';
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
  typeEnumIndex: TypeEnumIndex = TypeEnum;
  type1: string = '';
  type2: string = '';

  constructor(private pokeApiService: PokeApiService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.pokeApiService.getPokemonsDetails(this.pokemon.url).subscribe((data: any) => {
      this.pokemonDetails = data;
      this.type1 = this.pokemonDetails.types[0].type.name;
      if (this.pokemonDetails.types.length > 1) {
        this.type2 = this.pokemonDetails.types[1].type.name;
      }else{
        this.type2 = this.type1;
      }
      console.log(this.pokemonDetails);
    });
    const elemento = this.renderer.selectRootElement('card-front');
    console.log(elemento);
    this.renderer.addClass(elemento, this.pokemonDetails.types[0].type.name);

  }

  setPokemonCardColor(t1: string, t2: string): any {

    if (this.typeEnumIndex[t1] !== undefined) {
      const color1 = this.typeEnumIndex[t1];
      const color2 = this.typeEnumIndex[t2];
      const style = {
        background: 'linear-gradient( ' + color1 + 'AA, ' + color2 + 'AA)',
        'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        'border-color': color1,
      };
      return style;
    } else {
      return { background: 'white' };
    }
  }

  setPokemonIconColor(t: string): any {

    if (this.typeEnumIndex[t] !== undefined) {
      const color = this.typeEnumIndex[t];
      const style = {
        background: color,
        'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      };
      return style;
    } else {
      return { background: 'white' };
    }
  }

}
