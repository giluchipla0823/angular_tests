import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // BASE_URL: string = 'https://servicios.crea-energia.com/';
  BASE_URL: string = 'http://cecheckout.local/';

  constructor(private http: HttpClient) {}

  getProducts(){
    return this.http.get(`${ this.BASE_URL }producto?tipo_ck=G`);
  }


  getCities(){
    return this.http.get(`${ this.BASE_URL }ciudad?cp=08950`);
  }

  getCUPSValidate(){
    return this.http.get(`${ this.BASE_URL }cups?tipo=E&tipo_busqueda=C&cups=ES0031408099937005EB`);
  }

  getCUPSByAddress(){
    // return this.http.get(`${ this.BASE_URL }cups?tipo=E&tipo_busqueda=D&cp=08950&direccion=via de prueba 1 2`);
    return this.http.get(`${ this.BASE_URL }cups?tipo=E&tipo_busqueda=D`);
  }
}
