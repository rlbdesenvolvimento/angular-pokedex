import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pokemon } from 'src/app/models/pokemon';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  rows: number = 14;
  first: number = 0;
  totalRecords: number = 0;

  pokemons: Pokemon[] = [];

  private pokeApiService = inject(PokeApiService);
  

  ngOnInit(): void {
    this.pokeApiService.getPokemons().subscribe((data: any) => {
      this.pokemons = data.results;
      this.totalRecords = data.count;
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    let page = event.page;

    this.pokeApiService.getPokemons(event.rows, page * this.rows).subscribe((data: any) => {
      this.pokemons = data.results;
      this.totalRecords = data.count;
    });
  }

  
}
