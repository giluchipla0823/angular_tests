import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GenresService extends BaseService {

  getGenres(): Observable<any> {
    const url: string = `${this.BASE_URL}genres`;

    return this.http.get(url);
  }
}
