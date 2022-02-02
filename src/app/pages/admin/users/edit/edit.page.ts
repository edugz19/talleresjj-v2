import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { BaseFormUser } from 'src/app/utils/base-form-user';
import * as alert from 'alertifyjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  id = this._route.snapshot.paramMap.get('id');
  showPasswordField = false;
  authUser;

  constructor(
    private userSvc: UsersService,
    public userForm: BaseFormUser,
    public router: Router,
    private _route: ActivatedRoute,
    private authSvc: AuthService,
    private afAuth: AngularFireAuth
    ) { }

  ngOnInit() {
    this.userSvc.getUserById(this.id).subscribe( user => {

      this.userForm.baseForm.patchValue({
        username: user.username,
        fullname: user.fullname,
        role: user.role,
        phone: user.phone,
        address: user.address,
        city: user.city,
        province: user.province,
        zipcode: user.zipcode,
        nnss: user.nnss
      });

    });

    this.afAuth.user.subscribe( user => {
      this.authUser = user;
    });

  }

  onSave(): void {
    const formValue = this.userForm.baseForm.value;
    this.userSvc.updateUser(formValue, this.id);
    this.router.navigate(['/users']);
  }

  close():void {
    this.router.navigate(['/users']);
  }

  checkField(field:string): boolean {
    return this.userForm.isValidField(field)!;
  }

}
