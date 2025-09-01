import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pass = control.get('password')?.value;
    const retype = control.get('retype')?.value;

    return (pass === retype) ? null : {matchPassword: 'Passwords must match.'};
  };
}