import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { User, Roles } from 'src/app/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  isAuth() {
    return this.afAuth.authState.pipe(map( auth => auth ));
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then( userData => resolve( userData ),
            err => reject( err )
        )
    });
  }

  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  logout() {
    return this.afAuth.signOut();
  }

  createUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then( userData => resolve( userData ),
            err => reject( err )
        )
    });
  }

  async sendRecoveryEmail(email: string) {
    return await this.afAuth
    .sendPasswordResetEmail(email)
    .catch( (error) => {
      console.log(error);
    });
  }

  async resetPassword(password:string, oobCode: string) {
    return await this.afAuth.confirmPasswordReset(oobCode, password);
  }


  // private checkToken(): void {
  //   const user = JSON.parse(localStorage.getItem('user')!);

  //   if (user) {
  //     const isExpired = helper.isTokenExpired(user.token);

  //     if (isExpired) {
  //       this.logout();
  //     } else {
  //       this.loggedIn.next(true);
  //       this.role.next(user.role);
  //       this.userToken.next(user.token);
  //     }
  //   }
  // }


  // private saveLocalStorage(user: UserResponse): void {
  //   const { message, ...rest } = user;
  //   localStorage.setItem('user', JSON.stringify(rest));    
  // }


  // private handlerError(err: any): Observable<never> {
  //   let errorMessage = 'An error occured retrieving data';    

  //   if (err) {
  //     errorMessage = err.error.message;
  //   }
    
  //   return throwError(errorMessage);
  // }
}
