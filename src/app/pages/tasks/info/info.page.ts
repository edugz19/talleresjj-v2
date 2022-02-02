import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import * as alertifyjs from 'alertifyjs';
import { Task } from 'src/app/models/task.interface';
import { UsersService } from 'src/app/services/users/users.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  id = this._route.snapshot.paramMap.get('id');
  task!: Task;
  userFullname: string;
  ref: AngularFireStorageReference;
  afTask: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: string;
  urlText: string;
  style: string;

  constructor(
    private taskSvc: TasksService, 
    public router: Router,
    private _route: ActivatedRoute,
    private userSvc: UsersService,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.taskSvc.getTaskById(this.id).subscribe( task => {
      this.task = task;
      
      this.userSvc.getUserById(this.task.userId).subscribe( user => {
        this.userFullname = user.fullname;
      });
    });

    this.getLink();
  }

  getLink() {
    this.afStorage.ref(this.id).listAll().subscribe(links => {
      if (links.items.length === 0) {
        this.downloadURL = ''
        this.urlText = 'No invoice.'
        this.style = 'text-decoration: none; color:black; cursor: auto';
      } else {
        this.afStorage.ref(this.id + '/' + this.id).getDownloadURL().subscribe( url =>this.downloadURL = url);
        this.urlText = 'Download invoice';
        this.style = 'text-decoration: underline; color:blue; cursor: pointer';
      }
    });
  }

  format(date: string): string {
    let dateFormat = moment(date).format("Y/M/D HH:mm");
    return dateFormat;    
  }

  // ngOnDestroy() {
  //   this.destroy$.next({});
  //   this.destroy$.complete();
  // }

  checkState(state):string {
    if (state == "created") return "warning";
    if (state == "in progress") return "build";
    if (state == "completed") return "checkmark-circle";
  }

  return(): void {
    this.router.navigate(['/tasks']);
  }

  update(id: string): void {
    this.router.navigate(['/tasks/edit/' + id]);
  }

  delete(id: string) {
    if (window.confirm('Do you really want remove this task ?')) {
      this.taskSvc.deleteTask(id);
    }

    this.return();
  }

  upload(event) {
    let file = event.target.files[0];
    this.ref = this.afStorage.ref(`${this.id}/${this.id}`);
    this.afTask = this.ref.put(file);
    this.uploadProgress = this.afTask.percentageChanges();
  }

  viewImage(url) {
    if(url === '') return;

    let newTab = window.open(url, '_black');
    newTab.focus();
  }

}
