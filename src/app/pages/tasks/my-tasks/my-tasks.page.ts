import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.interface';
import { User } from 'src/app/models/user.interface';
import { CryptoService } from 'src/app/services/crypto/crypto.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { UsersService } from 'src/app/services/users/users.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.page.html',
  styleUrls: ['./my-tasks.page.scss'],
})
export class MyTasksPage implements OnInit {

  // private destroy$ = new Subject<any>();

  data: string = localStorage.getItem("data");
  key: string = environment.firebase.apiKey;
  tasks = [];
  user: User;

  constructor(
    private userSvc: UsersService,
    private taskSvc: TasksService,
    private cryptoSvc: CryptoService,
    public router: Router
    ) { }

  ngOnInit() {
    let cypher = this.cryptoSvc.desencryptData(this.data, this.key);
    this.userSvc.getUserByEmail(cypher).subscribe( user => {
      this.user = user[0];

      let userTasks = this.user.tasks;

      userTasks.forEach( element => {
        this.taskSvc.getTaskById(element).subscribe( task => this.tasks.push(task) );
      });
    });
  }

  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  //   this.subscription.unsubscribe();   
  // }

  format(date: string): string {
    let dateFormat = moment(date).format("Y/M/D HH:mm");
    return dateFormat;    
  }

  info(id: string): void {
    this.router.navigate(['tasks/my-tasks/info/' + id]);
  }

}
