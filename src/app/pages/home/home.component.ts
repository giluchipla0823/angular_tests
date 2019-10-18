import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PokemonsService } from '../../services/pokemons.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private pokemonsService: PokemonsService
  ){
    
  }

  ngOnInit(){

  }

  showProducts(){
    this.productsService.getProducts()
        .subscribe((response: any) => {
          console.log('success', response);
        });
  }

  showCUPSValidate(){
    this.productsService.getCUPSValidate()
        .subscribe((response: any) => {
          
          console.log('showCUPSValidate', response);
        });
  }

  showCUPSByAddress(){
    this.productsService.getCUPSByAddress()
        .subscribe((response: any) => {
          console.log('showCUPSByAddress', response);
        });
  }

  showCities(){
    this.productsService.getCities()
        .subscribe((response: any) => {
          console.log('Cities', response);
        });
  }

  showPokemons(){
    this.pokemonsService.getPokemons()
        .subscribe((response: any) => {
            console.log('List the pokemons', response);
        });
  }

  showAlert() {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      type: 'error',
      confirmButtonText: 'Cool'
    });
  }

}
