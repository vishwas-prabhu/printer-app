import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { passwordValidator } from 'src/app/shared/validators/validation'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      updateOn: 'change',
      validators: [
        Validators.required,
        Validators.minLength(8),
        passwordValidator,
      ],
    }),
  })

  passwordType = 'password'
  emailError = ''

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard')
    }
  }

  onSubmit(): void {
    this.loginForm.disable()
    this.authService.setLoginData(this.loginForm.value).then(data => {
      this.loginForm.enable()
      if (data) {
        this.router.navigateByUrl('/dashboard')
      } else {
        this.emailError = 'Email does not exists'
        this.loginForm.reset()
      }
    })
  }

  togglePasswordType(): void {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text'
  }

  get email(): any {
    return this.loginForm.controls.email
  }

  get password(): any {
    return this.loginForm.controls.password
  }
}
