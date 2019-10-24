import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService extends BaseService {

  getAuthors(): Observable<any> {
    const url: string = `${this.BASE_URL}authors`;

    return this.http.get(url);
  }
}
