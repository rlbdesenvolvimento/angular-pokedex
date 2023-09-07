import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { PokemonDetails } from '../models/pokemon-details';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  url = 'https://pokeapi.co/api/v2/';

  // inject HttpClient
  constructor(private httpClient: HttpClient) { }

  // Defaut Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // get all pokemons
  getPokemons(limit: number = 10, offset:number = 0): Observable<Pokemon[]> {
    return this.httpClient.get<Pokemon[]>(this.url+ `pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // get pokemonDetails by url
  getPokemonsDetails(urlPokemon: string): Observable<PokemonDetails> {
    return this.httpClient.get<PokemonDetails>(urlPokemon)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getPokemon(id: number): Observable<PokemonDetails> {
    return this.httpClient.get<PokemonDetails>(this.url + 'pokemon/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;

    } else {

      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
