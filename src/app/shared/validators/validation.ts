import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.value
  const regEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return !regEx.test(password) && password?.length > 0
    ? { passwordError: true }
    : null
}
