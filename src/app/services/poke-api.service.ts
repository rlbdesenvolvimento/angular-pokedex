import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { Observable, retry, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  url = 'https://pokeapi.co/api/v2/'; // api rest fake

  // inject HttpClient
  constructor(private httpClient: HttpClient) { }

  // Defaut Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // get all pokemons
  getPokemons(): Observable<Pokemon[]> {
    return this.httpClient.get<Pokemon[]>(this.url+'pokemon?limit=10000')
      .pipe(
        retry(2),
        catchError(this.handleError))
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