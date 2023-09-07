import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonDetails } from 'src/app/models/pokemon-details';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public pokemonDetails: PokemonDetails,
  ) { }

  ngOnInit(): void {
  }

}
