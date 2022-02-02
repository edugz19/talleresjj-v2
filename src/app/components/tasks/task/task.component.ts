import { Component, Input, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import * as moment from 'moment';
import { map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  tasks: Task[] = [];
  tasksCollection: AngularFirestoreCollection;

  // private destroy$ = new Subject<any>();

  @Input('tasks') task: Task[];

  constructor(private taskSvc: TasksService, public router: Router) {}

  ngOnInit() {
    this.taskSvc.getTasks().subscribe( tasks => this.tasks = tasks );
  }

  // format(date: string): string {
  //   let dateFormat = moment(date).format("Y/M/D HH:mm");
  //   return dateFormat;    
  // }

  // ngOnDestroy() {
  //   this.destroy$.next({});
  //   this.destroy$.complete();
  // }

  info(id: string): void {
    this.router.navigate(['tasks/info/' + id]);
  }

}
