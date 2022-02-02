import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { UsersService } from 'src/app/services/users/users.service';
import { BaseFormTask } from 'src/app/utils/base-form-task';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {

  // id = parseInt(this._route.snapshot.paramMap.get('id'));
  // usId = JSON.parse(localStorage.getItem("user")).userId;
  // fullname: string;

  // constructor(
  //   private taskSvc: TasksService,
  //   public router: Router,
  //   public taskForm: BaseFormTask,
  //   private _route: ActivatedRoute,
  //   private userSvc: UsersService
  // ) {}

  // ngOnInit(): void {
  //   this.taskSvc.getById(this.id).subscribe( (res) => {

  //     this.taskForm.baseForm.patchValue({
  //       title: res[0].title,
  //       description: res[0].description,
  //       observations: res[0].observations,
  //       state: res[0].state,
  //       course: res[0].course,
  //       user: res[0].user.id
  //     });
  //   });    

  //   this.userSvc.getById(this.usId).subscribe( (res) => {
  //     this.fullname = res[0].fullname;
  //   });
  // }

  // onSave() {
  //   const formValue = this.taskForm.baseForm.value;

  //   if (formValue.user === "null") formValue.user = null;

  //   this.taskSvc.updateTask(this.id, formValue).subscribe( (res) => {
  //     alertifyjs.success('Task Updated successfully!', 3);
  //   }, (err) => {
  //     alertifyjs.error('Error To Update Task', 3);
  //   });

  //   this.router.navigate(['/tasks/my-tasks']);
  // }

  // checkField(field:string): boolean {
  //   return this.taskForm.isValidField(field)!;
  // }

  // close(): void {
  //   this.router.navigate(['/tasks/my-tasks/info/' + this.id]);
  // }

  // checkState(): boolean {    
  //   if (this.taskForm.baseForm.value.state == 'in progress')
  //   return true;
  // }

}
