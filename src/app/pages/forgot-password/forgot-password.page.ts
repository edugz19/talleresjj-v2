import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as alertifyjs from 'alertifyjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  private isValidEmail = /\S+@\S+\.\S+/;
  forgetForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]]
  })

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private afauth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.forgetForm.patchValue({
      username: ""
    })
  }

  sendEmail(): void {
    const email = this.forgetForm.value.username;

    this.authSvc.sendRecoveryEmail(email);

    alertifyjs.success('Email sent. Check you email account please', 3);
    this.router.navigate(['login']);

  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.forgetForm.get(field)?.errors?.required) {
      message = 'You must enter a value';
    } else if (this.forgetForm.get(field)?.hasError('pattern')) {
      message = 'Not valid email';
    }

    return message;
  }

  isValidField(field: string) {
    this.getErrorMessage(field);
    return (
      (this.forgetForm.get(field)?.touched || this.forgetForm.get(field)?.dirty) &&
      !this.forgetForm.get(field)?.valid
    );
  }

}
