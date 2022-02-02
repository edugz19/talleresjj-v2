import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class BaseFormTask {
  errorMessage = null;

  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    userId: [''],
    state: [''],
    course: [''],
    observations: ['']
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
    }
    return message;
  }  
}