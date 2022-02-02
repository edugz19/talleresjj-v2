import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { UsersService } from 'src/app/services/users/users.service';
import { BaseFormTask } from 'src/app/utils/base-form-task';
import * as alertifyjs from 'alertifyjs';
import { Task } from 'src/app/models/task.interface';
import * as moment from 'moment';
import { User } from 'src/app/models/user.interface';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  task = {} as Task;
  users: User[];
  user: User;
  taskId: string;
  token: string;

  constructor(
    private taskSvc: TasksService,
    public fb: FormBuilder,
    public router: Router,
    public taskForm: BaseFormTask,
    private userSvc: UsersService,
    private msSvc: MessagingService
  ) {}

  ngOnInit(): void {
    this.taskForm.baseForm.patchValue({
      title: '',
      description: '',
      userId: '',
      observations: ''
    });

    this.userSvc.getUsers().subscribe( users => {
      this.users = users;
    });
  }

  onSave() {
    this.task = this.taskForm.baseForm.value;
    this.task.state = 'created';
    this.task.userId = null;
    this.task.created_at = moment().format();

    this.taskSvc.addTask(this.task);

    this.msSvc.postMessageData(this.task.title);

    this.router.navigate(['/tasks']);
  }

  checkField(field:string): boolean {
    return this.taskForm.isValidField(field)!;
  }

  close(): void {
    this.router.navigate(['/tasks']);
  }

}
