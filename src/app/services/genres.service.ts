import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  BASE_URL = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getGenres(): Observable<any> {
    const url: string = `${this.BASE_URL}genres`;

    return this.http.get(url);
  }
}
