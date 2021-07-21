import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http'

import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/internal/operators'
import { AuthService } from 'src/app/core/services/auth.service'

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
    console.log(reqUrl)
    return next.handle(reqUrl).pipe(catchError(this.handleError))
  }

  // tslint:disable-next-line: typedef
  handleError(error: HttpErrorResponse) {
    return throwError(error)
  }
}
