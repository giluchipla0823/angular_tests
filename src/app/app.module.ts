import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { Select2Module } from 'ng2-select2';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HomeComponent } from './pages/home/home.component';
import { DatatablesDemoComponent } from './pages/datatables-demo/datatables-demo.component';
import { APP_ROUTES } from './app.routes';
import { FooterComponent } from './components/footer/footer.component';
import { DatatablesFormComponent } from './pages/datatables-demo/datatables-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CapitalizePipe,
    HomeComponent,
    DatatablesDemoComponent,
    FooterComponent,
    DatatablesFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    Select2Module,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
