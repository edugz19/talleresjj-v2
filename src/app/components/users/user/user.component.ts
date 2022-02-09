import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users/users.service';
import * as alert from 'alertifyjs';
import { User } from 'src/app/models/user.interface';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  users: User[] = [];
  usersCollection: AngularFirestoreCollection;

  // private destroy$ = new Subject<any>();

  @Input('users') user: User;

  constructor(private userSvc: UsersService, public router: Router) { }

  ngOnInit() {
    this.userSvc.getUsers().subscribe( users => this.users = users );
  }

  // ngOnDestroy() {
  //   this.destroy$.next({});
  //   this.destroy$.complete();
  // }

  delete(id: string): void {
    if (window.confirm('Do you really want remove this user ?')) {
      this.userSvc.deleteUser(id);
    }
  }

  update(id: string): void {
    this.router.navigate(['/users/edit/' + id]);
  }

}
