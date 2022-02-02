import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  constructor( public db: AngularFirestore ) {
    this.usersCollection = this.db.collection('users');
    this.users = this.usersCollection.snapshotChanges().pipe(
      map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data() as User;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.db.collection<User>('users').doc(id).valueChanges();
  }

  getUserByEmail(email: string) {
    return this.db.collection<any>('users', ref => ref.where('username', '==', email)).valueChanges();
  }

  deleteUser(id: string) {
    this.userDoc = this.db.doc(`users/${id}`);
    this.userDoc.delete();
  }

  addUser(user: User) {
    this.usersCollection.add(user);
  }

  updateUser(user: User, id: string) {
    this.userDoc = this.db.doc(`users/${id}`);
    this.userDoc.update(user);
  }
}
