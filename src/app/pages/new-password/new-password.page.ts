import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {
  hide = true;
  hideConfirm = true;
  newPasswordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  });

  url: string = window.location.href;
  oobCode: string = this.url.substring(this.url.indexOf('oobCode='), this.url.indexOf('&apiKey')).substring(8);

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.newPasswordForm.patchValue({
      password: "",
      confirmPassword: ""
    });

  }

  updatePassword():void {
    const form = this.newPasswordForm.value;
    let newPassword = form.password;
    let confirmPassword = form.confirmPassword;

    if (newPassword !== confirmPassword) {
      alertifyjs.error('Passwords do not match', 4);
    } else {
      this.authSvc.resetPassword(newPassword, this.oobCode);
      alertifyjs.success('Password updated succesfully', 3);
      this.router.navigate(['login']);
    }
  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.newPasswordForm.get(field)?.errors?.required) {
      message = 'You must enter a value';
    } else if (this.newPasswordForm.get(field)?.hasError('minlength')) {
      const minLength = this.newPasswordForm.get(field)?.errors?.minlength.requiredLength;
      message = `This field must be longer than ${minLength} characters`;
    }

    return message;
  }

  isValidField(field: string) {
    this.getErrorMessage(field);
    return (
      (this.newPasswordForm.get(field)?.touched || this.newPasswordForm.get(field)?.dirty) &&
      !this.newPasswordForm.get(field)?.valid
    );
  }

}
