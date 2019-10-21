import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  BASE_URL = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<any> {
    const url: string = `${this.BASE_URL}authors`;

    return this.http.get(url);
  }
}
