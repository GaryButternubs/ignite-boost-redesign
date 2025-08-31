import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pass = control.get('password');
    const retype = control.get('retype');
    return (pass === retype) ? null : {matchPassword: {value: 'Passwords must match.'}};
  };
}