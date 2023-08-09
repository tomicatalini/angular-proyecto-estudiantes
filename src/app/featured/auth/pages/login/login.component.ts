import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passControl = new FormControl('', [Validators.required, Validators.min(6)]);

  authForm = new FormGroup({
    email: this.emailControl,
    pass: this.passControl
  });

  showPass: boolean = false;

  constructor(
    private authService: AuthService
  ){}

  login(){
    if(this.authForm.invalid){
      this.authForm.markAllAsTouched();
    } else {
      this.authService.login(this.authForm.getRawValue());
    }
  }

  onKeyEnter(event: Event) {
    event.preventDefault();
    this.login();
  }
}
