import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HomeComponent } from './pages/home/home.component';
import { DatatablesDemoComponent } from './pages/datatables-demo/datatables-demo.component';
import { APP_ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CapitalizePipe,
    HomeComponent,
    DatatablesDemoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DataTablesModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
