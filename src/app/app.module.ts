import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { Select2Module } from 'ng2-select2';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { APP_ROUTES } from './app.routes';

// Components
import {
  AppComponent,
  NavbarComponent,
  FooterComponent,
} from './components/index.component';

// Pages
import {
  HomeComponent,
  DatatablesDemoComponent,
  DatatablesSearchFormComponent,
  DatatablesModalFormComponent
} from './pages/index.page';

// Interceptors
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { HttpCancelInterceptor } from './interceptors/http-cancel.interceptor';

// Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { HttpJwtInterceptor } from './interceptors/http-jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CapitalizePipe,
    HomeComponent,
    DatatablesDemoComponent,
    FooterComponent,
    DatatablesSearchFormComponent,
    DatatablesModalFormComponent,
    LoaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    Select2Module,
    APP_ROUTES,
    ModalModule.forRoot(),
  ],
  exports: [ModalModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCancelInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpJwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
