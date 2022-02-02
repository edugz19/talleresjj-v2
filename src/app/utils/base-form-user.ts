import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {
  private isValidEmail = /\S+@\S+\.\S+/;
  private isValidPhone = /[0-9]{9}/;
  private isValidZipcode = /[0-9]{5}/;
  private isValidNNSS = /[0-9]{12}/;
  errorMessage = null;

  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    fullname: ['', [Validators.required]],
    role: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(this.isValidPhone)]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    province: ['', [Validators.required]],
    zipcode: ['', [Validators.required, Validators.pattern(this.isValidZipcode)]],
    nnss: ['', [Validators.required, Validators.pattern(this.isValidNNSS)]]
  });

  isValidField(field: string) {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field)?.touched || this.baseForm.get(field)?.dirty) &&
      !this.baseForm.get(field)?.valid
    );
  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.baseForm.get(field)?.errors?.required) {
      message = 'You must enter a value';
    } else if (this.baseForm.get(field)?.hasError('pattern')) {
      
      if (field == "username") message = 'Not valid email';
      if (field == "phone") message = 'Number Phone must have 9 digits';
      if (field == "zipcode") message = 'Zip Code must have 5 digits';
      if (field == "nnss") message = 'NNSS must have 12 digits';

    } else if (this.baseForm.get(field)?.hasError('minlength')) {
      const minLength = this.baseForm.get(field)?.errors?.minlength.requiredLength;
      message = `This field must be longer than ${minLength} characters`;
    } 

    return message;
  }  
}