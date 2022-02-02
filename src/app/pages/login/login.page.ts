import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as alertifyjs from 'alertifyjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';
import { environment } from 'src/environments/environment';
import { CryptoService } from 'src/app/services/crypto/crypto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  hide = true;
  private isValidEmail = /\S+@\S+\.\S+/;
  key: string = environment.firebase.apiKey;

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  }); 

  constructor(
    private authSvc: AuthService, 
    private fb: FormBuilder,
    private router: Router,
    private cryptoSvc: CryptoService
  ) { }

  onLogin(): void {

    if (this.loginForm.invalid) return;

    let email = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    this.authSvc.login(email, password)
      .then( (res) => {

        localStorage.setItem('data', this.cryptoSvc.encryptData(email, this.key));

        window.location.href = 'dashboard';
      })
      .catch( err => console.log('err', err.message) );
    
  }

  onLoginGoogle() {
    this.authSvc.loginWithGoogle()
      .then( (res) => {
        this.router.navigate(['/dashboard']);
      })
      .catch( err => console.log('err', err));
  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.loginForm.get(field)?.errors?.required) {
      message = 'You must enter a value';
    } else if (this.loginForm.get(field)?.hasError('pattern')) {
      message = 'Not valid email';
    } else if (this.loginForm.get(field)?.hasError('minlength')) {
      const minLength = this.loginForm.get(field)?.errors?.minlength.requiredLength;
      message = `This field must be longer than ${minLength} characters`;
    }    
    return message;
  }

  isValidField(field: string) {
    this.getErrorMessage(field);
    return (
      (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) &&
      !this.loginForm.get(field)?.valid
    );
  }
}
