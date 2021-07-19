import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService, private router: Router) {}

  /**
   * Checks for the login_data cookie in cookies
   * @returns `true` if cookie is present
   */
  isLoggedIn(): boolean {
    return this.cookieService.check('login_data')
  }

  /**
   * Sets the cookie login_data with the email value
   * @param value email and password from the login form
   * @returns Promise(true) if cookie is saved successfully
   */
  setLoginData(value: any): Promise<boolean> {
    if (value.email === 'admin@gmail.com' && value.password === 'Admin@123') {
      this.cookieService.set('login_data', value.email, { expires: 5 })
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  }

  /**
   * Handles the logout of the user
   * clears the custom filters and cookies related to the user
   */
  logout(): void {
    this.cookieService.delete('login_data')
    localStorage.removeItem('selectedColumns')
    this.router.navigateByUrl('/login')
  }
}
