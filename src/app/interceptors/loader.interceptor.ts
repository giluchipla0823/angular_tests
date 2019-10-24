import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { LoaderService } from '../services/loader.service';

import { Observable } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) { }

  removeRequest(req: HttpRequest<any>) {
      const i = this.requests.indexOf(req);

      if (i >= 0) {
          this.requests.splice(i, 1);
      }

      this.loaderService.setActive(true);
      this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.loaderService.isActivated()) {
            this.requests.push(req);
            this.loaderService.isLoading.next(true);
        }

        return new Observable(observer => {
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                        }
                    },
                    err => {
                        this.removeRequest(req);
                        observer.error(err);
                    },
                    () => {
                        this.removeRequest(req);
                        observer.complete();
                    });

            // remove request from queue when cancelled
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
}
