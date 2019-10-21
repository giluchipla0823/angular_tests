import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import {map, catchError } from  'rxjs/operators'

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log('HttpErrorInterceptor', req);


    return next.handle(req).pipe(
       catchError((err: any) => {
        if(err instanceof HttpErrorResponse){
          // const error: HttpErrorResponse = err;

          
          Swal.fire({
            title: 'Error',
            // text: 'Error a mostrar' + err.status,
            text: err.error.errorFields.cp[0],
            type: 'error'
          });
          

          /*
          if(err.status === 400){
            console.log('aaaaaaa', err.error.errorFields);
            
          }
          */

        }
      
        return throwError(err);
       })
    );
  }
}
