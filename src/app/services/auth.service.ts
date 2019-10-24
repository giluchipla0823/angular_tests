import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL: string = 'http://127.0.0.1:8000/api/';

  private token: string;
  private user: any;
  private authenticated: boolean = false;

  constructor(private http: HttpClient) {
    this.loadStorage();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}login`, {email: username, password});
  }

  saveStorage(data: any) {
    const token: string = data.token;
    const user: any = data.user;

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userdata', JSON.stringify(user));

    this.loadStorage();
  }

  loadStorage(): void {
    this.token = sessionStorage.getItem('token') || null;

    if (sessionStorage.getItem('userdata')) {
      this.user = JSON.parse(sessionStorage.getItem('userdata'));
    }

    this.authenticated = this.token ? true : false;
  }

  isAuthenticated(): boolean {
      return this.authenticated;
  }

  getUserAuthenticated(): any {
    if (!this.user || !this.token) {
      return null;
    }

    return {
      data: this.user,
      token: this.token
    };
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userdata');

    this.loadStorage();
  }
}
