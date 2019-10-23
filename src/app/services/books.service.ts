import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  BASE_URL = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getBook(id: number): Observable<any> {
    const url: string = `${this.BASE_URL}books/${id}?includes=genres`;

    return this.http.get(url);
  }

  deleteBook(id: number): Observable<any> {
    const url: string = `${this.BASE_URL}books/${id}`;

    return this.http.delete(url);
  }

  createOrUpdateBook(data: any, id?: number): Observable<any> {
    if (id) {
      return this.updatedBook(data, id);
    }

    return this.createBook(data);
  }

  createBook(data: any): Observable<any> {
    const url: string = `${this.BASE_URL}books`;

    return this.http.post(url, data);
  }

  updatedBook(data: any, id: number): Observable<any> {
    const url: string = `${this.BASE_URL}books/${id}`;

    return this.http.put(url, data);
  }
}
