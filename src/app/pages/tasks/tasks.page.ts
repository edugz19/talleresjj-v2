import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.interface';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit{

  tasks: Task[] = [];

  constructor( private taskSvc: TasksService, public router: Router ) {}

  ngOnInit(): void {
    this.taskSvc.getTasks().
      subscribe( tasks => this.tasks = tasks);
  }

  // private destroy$ = new Subject<any>();

  // subscription: Subscription;

  // constructor(private taskSvc: TasksService, public router: Router) { }

  // ngOnInit() {
  //   this.getTasks();

  //   this.subscription = this.taskSvc.refresh$.subscribe(() => {
  //     this.getTasks();
  //   })
  // }

  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  //   this.subscription.unsubscribe();
  // }

  addTask(): void {
    this.router.navigate(['/tasks/add']);
  }

  // getTasks(): void {
  //   this.taskSvc.getAll().subscribe((tasks: any) => {
  //     this.dataSource = tasks;
  //   });
  // }

}
