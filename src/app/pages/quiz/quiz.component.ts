import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { PokemonDetails } from 'src/app/models/pokemon-details';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  pokemon: PokemonDetails | null = null;
  options: string[] = [];
  answer: string = '';
  revealed: boolean = false;
  loading: boolean = false;
  selectedOption: string | null = null;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.generateQuiz();
  }

  generateQuiz() {
    this.loading = true;
    this.revealed = false;
    this.selectedOption = null;
    this.options = [];

    const randomId = Math.floor(Math.random() * 151) + 1; // Geração 1
    this.pokeApiService.getPokemon(randomId).subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
        this.answer = pokemon.name;
        this.generateOptions(pokemon.name, pokemon.id);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  generateOptions(correctName: string, currentId?: number) {
    const ids = new Set<number>();
    while (ids.size < 3) {
      const id = Math.floor(Math.random() * 151) + 1;
      if (id !== currentId) ids.add(id);
    }

    const calls = Array.from(ids).map(id => this.pokeApiService.getPokemon(id));
    forkJoin(calls).subscribe({
      next: (results: PokemonDetails[]) => {
        const names = results.map(r => r.name);
        this.options = this.shuffle([correctName, ...names]);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.revealed = true;
  }

  nextQuiz() {
    this.generateQuiz();
  }
}
