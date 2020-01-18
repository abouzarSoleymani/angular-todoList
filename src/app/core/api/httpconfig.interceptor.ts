import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {ApiService} from './api.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private spinner: NgxSpinnerService,
                private router: Router,
                private apiService: ApiService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        setTimeout(() => this.spinner.show(), 25 )
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event.ok);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
               console.log(data)
              if(error.status === 401) {
                  window.location.href = '/';
                  this.apiService.removeAuthenticationToken();
              }
                return throwError(error);
            }), finalize( () => setTimeout(() => this.spinner.hide(), 25 )));
    }
}
