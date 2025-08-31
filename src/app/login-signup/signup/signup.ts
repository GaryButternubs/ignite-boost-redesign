import { Component, input, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPasswordValidator } from './match-password.directive';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
  changePass = input<boolean>(false);

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(32)]),
    password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(24)]),
    retype: new FormControl('', [Validators.required])
  }, { validators: matchPasswordValidator });
}
