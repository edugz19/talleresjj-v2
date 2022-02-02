import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from 'src/app/models/task.interface';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  taskDoc: AngularFirestoreDocument<Task>;

  constructor( public db: AngularFirestore ) {
    this.tasksCollection = this.db.collection('tasks');
    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data() as Task;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.db.collection<Task>('tasks').doc(id).valueChanges();
  }

  deleteTask(id: string) {
    this.taskDoc = this.db.doc(`tasks/${id}`);
    this.taskDoc.delete();
  }

  addTask(task: Task) {
    this.tasksCollection.add(task);
  }

  updateTask(task: Task, id: string) {
    this.taskDoc = this.db.doc(`tasks/${id}`);
    this.taskDoc.update(task);
  }
}
