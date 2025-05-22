import { Component, OnInit } from '@angular/core';
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

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.generateQuiz();
  }

  generateQuiz() {
    this.loading = true;
    this.revealed = false;
    const randomId = Math.floor(Math.random() * 151) + 1; // Geração 1
    this.pokeApiService.getPokemon(randomId).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.answer = pokemon.name;
      this.generateOptions(pokemon.name);
      this.loading = false;
    });
  }

  generateOptions(correctName: string) {
    const options = [correctName];
    while (options.length < 4) {
      const randomId = Math.floor(Math.random() * 151) + 1;
      this.pokeApiService.getPokemon(randomId).subscribe((poke) => {
        if (!options.includes(poke.name)) {
          options.push(poke.name);
        }
        if (options.length === 4) {
          this.options = this.shuffle(options);
        }
      });
    }
  }

  shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  selectOption(option: string) {
    this.revealed = true;
  }

  nextQuiz() {
    this.generateQuiz();
  }
}
