import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { AuthResponse } from 'src/app/shared/interfaces/auth-response'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router
  ) {}

  loggedInUser = ''

  /**
   * Checks for the user_token cookie in cookies
   * @returns `true` if cookie is present
   */
  isLoggedIn(): boolean {
    return this.cookieService.check('user_token')
  }

  getJwtToken(): string {
    return this.cookieService.get('user_token')
  }

  setUserInfo(): void {
    if (!this.loggedInUser.length) {
      this.http
        .get<any>(`${environment.baseUrl}userInfo`)
        .subscribe(data => (this.loggedInUser = data.userInfo.name))
    }
  }

  /**
   * Handles the login API request
   * @param value email and password from the login form
   * @returns response from the api
   */
  handleLogin(value: any): Observable<AuthResponse> {
    const headers = {
      'Content-type': 'application/json',
    }

    return this.http
      .post<AuthResponse>(`${environment.baseUrl}login`, value, { headers })
      .pipe(
        tap(({ api_response }) => {
          if (api_response.code === 200) {
            this.loggedInUser = api_response.name
            this.cookieService.set('user_token', api_response.jwt_token, {
              expires: 3,
            })
          }
        })
      )
  }

  /**
   * Handles the signin API request
   * @param value name, email and password from the signin form
   * @returns response from the api
   */
  handleSignIn(value: any): Observable<AuthResponse> {
    const headers = {
      'Content-type': 'application/json',
    }

    return this.http
      .post<AuthResponse>(`${environment.baseUrl}signin`, value, { headers })
      .pipe(
        tap(({ api_response }) => {
          if (api_response.code === 200) {
            this.loggedInUser = api_response.name
            this.cookieService.set('user_token', api_response.jwt_token, {
              expires: 3,
            })
          }
        })
      )
  }

  /**
   * Handles the logout of the user
   * clears the custom filters and cookies related to the user
   */
  logout(): void {
    this.loggedInUser = ''
    this.cookieService.delete('user_token')
    localStorage.removeItem('selectedColumns')
    this.router.navigateByUrl('/auth/login')
  }
}
