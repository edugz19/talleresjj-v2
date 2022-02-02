import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: User[] = [];

  private destroy$ = new Subject<any>();

  constructor(private userSvc: UsersService, public router: Router) { }

  ngOnInit() {
    this.userSvc.getUsers().subscribe( users => this.users = users);
  }

//   ngOnDestroy() {
//     this.destroy$.next();
//     this.destroy$.complete();
//     this.subscription.unsubscribe();   
//   }

  newUser(): void {
    this.router.navigate(['users/add']);
  }


// getUsers(): void {
//   this.userSvc.getAll().subscribe((tasks: any) => {
//     this.dataSource = tasks;
//   });
// }

}
