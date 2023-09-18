import {Component, OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonDetails} from 'src/app/models/pokemon-details';
import {PokeApiService} from 'src/app/services/poke-api.service';
import {TypeEnum, TypeEnumIndex} from "../../models/enums/type-enum";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  private pokeApiService = inject(PokeApiService);
  private route = inject(ActivatedRoute);
  pokemonDetails: PokemonDetails = {} as PokemonDetails;
  typeEnumIndex: TypeEnumIndex = TypeEnum;

  heightInMetres: string = '';
  heightInFeetInches: string = '';
  weightInKgs: string = '';
  weightInPounds: string = '';
  maxStat: number = 0;
  maxMaxStat: number = 0;
  maxMinStat: number = 0;
  maxPokemonStats: number[] = [];
  minPokemonStats: number[] = [];
  stats: string[] = ['0%', '0%', '0%', '0%', '0%', '0%'];
  statsToShow: number[] = [];
  selectedStat: string = 'base';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokeApiService.getPokemon(Number(params['id']))
        .subscribe(pokemonDetails => {
          this.pokemonDetails = pokemonDetails;
          this.setPokemonData();
          this.calculateStats();
        });
    });
  }

  setPokemonData() {
    this.heightInMetres = (this.pokemonDetails.height * 0.1).toFixed(1);
    this.heightInFeetInches = Math.floor(Number(this.heightInMetres) * 3.2808) + '"' + Math.round(((Number(this.heightInMetres) * 3.2808) % 1) * 12) + '\'';
    this.weightInKgs = (this.pokemonDetails.weight * 0.1).toFixed(1);
    this.weightInPounds = (Number(this.weightInKgs) * 2.205).toFixed(1);

  }

  calculateStats() {
    for (let i = 0; i < 6; i++) {
      let calculatedStat = this.pokemonDetails.stats[i].base_stat / this.maxStat * 100;
      if (calculatedStat > 10) {
        this.stats[i] = calculatedStat + '%';
      } else {
        calculatedStat = 10;
        this.stats[i] = calculatedStat + '%';
      }
    }
    this.statsToShow = [];
    this.pokemonDetails.stats.forEach(value => this.statsToShow.push(value.base_stat));
    this.calculateMinStats();
    this.calculateMaxStats();
  }

  calculateMaxStats() {
    if (this.pokemonDetails.id === 292) { // Shedinja HP
      this.maxPokemonStats[0] = 1;
    } else {
      this.maxPokemonStats[0] = Math.floor((2 * this.pokemonDetails.stats[0].base_stat + 31 + 63) * 100 / 100 + 100 + 10);
    }
    for (let i = 1; i < 6; i++) {
      this.maxPokemonStats[i] = Math.floor(Math.floor((2 * this.pokemonDetails.stats[i].base_stat + 31 + 63) * 100 / 100 + 5) * 1.1);
    }
    this.maxMaxStat = Math.max(...this.maxPokemonStats);
  }

  calculateMinStats() {
    if (this.pokemonDetails.id === 292) { // Shedinja HP
      this.minPokemonStats[0] = 1;
    } else {
      this.minPokemonStats[0] = Math.floor((2 * this.pokemonDetails.stats[0].base_stat) * 100 / 100 + 100 + 10);
    }
    for (let i = 1; i < 6; i++) {
      this.minPokemonStats[i] = Math.floor(Math.floor((2 * this.pokemonDetails.stats[i].base_stat) * 100 / 100 + 5) * 0.9);
    }
    this.maxMinStat = Math.max(...this.minPokemonStats);
  }

  totalBaseStats() {
    return (this.pokemonDetails.stats[0].base_stat + this.pokemonDetails.stats[1].base_stat + this.pokemonDetails.stats[2].base_stat + this.pokemonDetails.stats[3].base_stat
      + this.pokemonDetails.stats[4].base_stat + this.pokemonDetails.stats[5].base_stat);
  }

  showStats(type: string) {
    let stats: number[] = [];
    let maxStat: number = 0;

    this.pokemonDetails.stats.forEach(value => stats.push(value.base_stat));

    switch (type) {
      case 'base': {
        maxStat = this.maxStat;
        this.statsToShow = stats;
        this.selectedStat = 'base';
        break;
      }
      case 'max': {
        stats = this.maxPokemonStats;
        maxStat = this.maxMaxStat;
        this.statsToShow = this.maxPokemonStats;
        this.selectedStat = 'max';
        break;
      }
      case 'min': {
        stats = this.minPokemonStats;
        maxStat = this.maxMinStat;
        this.statsToShow = this.minPokemonStats;
        this.selectedStat = 'min';
      }
    }
    for (let i = 0; i < 6; i++) {
      let calculatedStat = stats[i] / maxStat * 100;
      if (calculatedStat > 15) {
        this.stats[i] = calculatedStat + '%';
      } else {
        calculatedStat = 15;
        this.stats[i] = calculatedStat + '%';
      }
    }
  }

  getColor(type:string){
    return this.typeEnumIndex[type];
  }

}
