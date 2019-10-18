import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  BASE_URL = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemons(){
    const url = `${this.BASE_URL}pokemon/?limit=811`;

    return this.http.get(url);
  }
}
