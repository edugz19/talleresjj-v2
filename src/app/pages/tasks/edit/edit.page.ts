import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { UsersService } from 'src/app/services/users/users.service';
import { BaseFormTask } from 'src/app/utils/base-form-task';
import * as alertifyjs from 'alertifyjs';
import { Task } from 'src/app/models/task.interface';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {

  id = this._route.snapshot.paramMap.get('id');
  task: Task;
  users: User[];
  user: User;
  oldUser: User;
  oldUserId: string;

  constructor(
    private taskSvc: TasksService,
    public router: Router,
    public taskForm: BaseFormTask,
    private _route: ActivatedRoute,
    private userSvc: UsersService
  ) {}

  ngOnInit(): void {
    this.taskSvc.getTaskById(this.id).subscribe( task => {

      if (task.userId != '') this.oldUserId = task.userId; 

      this.taskForm.baseForm.patchValue({
        title: task.title,
        description: task.description,
        observations: task?.observations,
        state: task.state,
        course: task?.course,
        userId: task.userId
      });
    });

    this.userSvc.getUsers().subscribe( users => this.users = users );
  }

  onSave() {
    this.task = this.taskForm.baseForm.value;

    let userId = this.task.userId;

    if (userId != '') {
      this.userSvc.getUserById(userId).subscribe( user => this.user = user );
      this.user.tasks?.push(this.id);
      this.userSvc.updateUser(this.user, userId);

      this.userSvc.getUserById(this.oldUserId).subscribe( user => this.oldUser = user );
      for (let i = 0; i < this.oldUser.tasks.length; i++) {
        if (this.oldUser.tasks[i] === this.task.id) this.oldUser.tasks.splice(i, 1);
      }
    }

    this.taskSvc.updateTask(this.task, this.id);    

    this.router.navigate(['/tasks/info/' + this.id]);
  }

  checkField(field:string): boolean {
    return this.taskForm.isValidField(field)!;
  }

  close(): void {
    this.router.navigate(['/tasks/info/' + this.id]);
  }

  checkState(): boolean {    
    if (this.taskForm.baseForm.value.state == 'in progress')
    return true;
  }
}
