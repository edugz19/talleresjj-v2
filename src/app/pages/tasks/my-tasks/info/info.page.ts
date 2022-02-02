import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import * as alertifyjs from 'alertifyjs';
import { Task } from 'src/app/models/task.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage {

  // id = parseInt(this._route.snapshot.paramMap.get('id'));
  // task: Task;
  // user: UserResponse;
  // fullname: string;

  // private destroy$ = new Subject<any>();

  // constructor(
  //   private taskSvc: TasksService, 
  //   public router: Router,
  //   private _route: ActivatedRoute
  //   ) { }

  // ngOnInit() {
  //   this.taskSvc.getById(this.id).subscribe( (task: Task) => {
  //     this.task = task[0];
  //     // this.user = task[0]['user'];

  //     // if (this.user === null) this.fullname = '';
  //     // else this.fullname = task[0]['user'].fullname;
  //   });     
  // }

  // format(date: string): string {
  //   let dateFormat = moment(date).format("Y/M/D HH:mm");
  //   return dateFormat;    
  // }

  // ngOnDestroy() {
  //   this.destroy$.next({});
  //   this.destroy$.complete();
  // }

  // checkState(state):string {
  //   if (state == "created") return "warning";
  //   if (state == "in progress") return "build";
  //   if (state == "completed") return "checkmark-circle";
  // }

  // return():void {
  //   this.router.navigate(['tasks/my-tasks']);
  // }

  // edit(id:number): void {
  //   this.router.navigate(['/tasks/my-tasks/edit/' + id]);
  // }

  // delete(id: number): void {
  //   if (window.confirm('Do you really want remove this task ?')) {
  //     this.taskSvc
  //     .deleteTask(id)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((res) => {        
  //       alertifyjs.success('Task Deleted Successfully!', 3);
  //       this.router.navigate(['/tasks']);
  //    }, (err) => {
  //       alertifyjs.error('Error To Delete Task!', 3);
  //     });
  //   }
  // }
}
