import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http'

import { Observable, throwError } from 'rxjs'
import { catchError, finalize, tap } from 'rxjs/internal/operators'
import { AuthService } from 'src/app/core/services/auth.service'
import { LoaderService } from '../services/loader.service'

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private loader: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loader.setLoading()
    let reqUrl

    if (this.authService.isLoggedIn()) {
      reqUrl = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getJwtToken()}`,
        },
      })
    } else {
      reqUrl = req
    }
    return next.handle(reqUrl).pipe(
      catchError(this.handleError),
      finalize(() => {
        this.loader.resetLoading()
      })
    )
  }

  // tslint:disable-next-line: typedef
  handleError(error: HttpErrorResponse) {
    return throwError(error)
  }
}
