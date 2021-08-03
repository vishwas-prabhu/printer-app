import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/core/services/auth.service'
import { passwordValidator } from 'src/app/shared/validators/validation'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signInForm = new FormGroup({
    name: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required, Validators.minLength(3)],
    }),
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

  /**
   * Handles the submit event of the login form
   */
  onSubmit(): void {
    this.signInForm.disable()
    this.authService
      .handleSignIn(this.signInForm.value)
      .subscribe(({ api_response }) => {
        this.signInForm.enable()

        if (api_response.code === 200) {
          this.router.navigateByUrl('/dashboard')
        } else {
          this.emailError = 'User Already Exists.'
          this.signInForm.reset()
        }
      })
  }

  /**
   * Toggles the type of input
   */
  togglePasswordType(): void {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text'
  }

  get name(): any {
    return this.signInForm.controls.name
  }

  get email(): any {
    return this.signInForm.controls.email
  }

  get password(): any {
    return this.signInForm.controls.password
  }
}
