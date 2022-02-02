import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private afsAuth: AngularFireAuth, private router: Router) {}

  // canActivate(): boolean {
  //   if (localStorage.getItem('user') !== null) {
  //     this.router.navigate(['/dashboard']);
  //     return false;
  //   } else return true;
  // }  

  canActivate() {
    if (localStorage.getItem('data') !== null) {
      this.router.navigate(['/dashboard']);
      return false;
    } else return true;
  }
  
}
