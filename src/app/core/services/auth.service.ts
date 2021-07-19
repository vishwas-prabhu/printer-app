import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.cookieService.check('login_data')
  }

  setLoginData(value: any): Promise<boolean> {
    if (value.email === 'admin@gmail.com' && value.password === 'Admin@123') {
      this.cookieService.set('login_data', value.email, { expires: 5 })
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  }

  logout(): void {
    this.cookieService.delete('login_data')
    localStorage.removeItem('selectedColumns')
    this.router.navigateByUrl('/login')
  }
}
