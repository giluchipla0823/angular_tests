import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  BASE_URL = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  deleteBook(id: number) {
    const url: string = `${this.BASE_URL}books/${id}`;

    return this.http.delete(url);
  }
}
