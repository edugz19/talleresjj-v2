import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { BaseFormUser } from 'src/app/utils/base-form-user';
import * as alert from 'alertifyjs';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  hide = true;
  user = {} as User;

  constructor(
    private userSvc: UsersService,
    public userForm: BaseFormUser,
    public router: Router,
    private authSvc: AuthService
    ) { }

  ngOnInit() {
    this.userForm.baseForm.patchValue({
      fullname: '',
      username: '',
      password: '', 
      role: '',
      phone: '',
      address: '',
      city: '',
      province: '',
      zipcode: '',
      nnss: ''
    })
  }

  onSave(): void {
    this.user = this.userForm.baseForm.value; 
    
    let email = this.user.username;
    let pass = this.user.password; 

    delete this.user.password;

    

    this.authSvc.createUser(email, pass)
      .then( (res) => {
        console.log('User created');
        this.userSvc.addUser(this.user);
      })
      .catch( err => console.log('err', err.message) );

    this.router.navigate(['/users']);

  }

  close():void {
    this.router.navigate(['/users']);
  }

  checkField(field:string): boolean {
    return this.userForm.isValidField(field)!;
  }

}
