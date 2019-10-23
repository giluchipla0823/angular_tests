import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Response } from '../utils/Response';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
       catchError((err: HttpErrorResponse) => {
        this.handleErrors(err);

        return throwError(err);
       })
    );
  }

  private handleErrors(err: HttpErrorResponse) {
      if (err.status === 0) {
        return Swal.fire('Error', err.message, 'error');
      }

      const error: Api = err.error;

      if (err.status === Response.HTTP_UNPROCESSABLE_ENTITY) {
        return this.showValidationErrors(error);
      }

      return Swal.fire('Error', error.message || err.message, 'error');
  }

  private showValidationErrors(error: Api) {
    const errors: ValidationErrors[] = error.errors;

    let html = `<br /><ul class="text-left">`;

    errors.forEach(item => {
        html += `<li>${ item.message }</li>`;
    });

    html += `</ul>`;

    Swal.fire({
      title: 'Form validation failed',
      html,
      type: 'warning'
    });
  }
}
