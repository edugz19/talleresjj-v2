import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';
import { CryptoService } from '../services/crypto/crypto.service';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private cryptoSvc: CryptoService, private userSvc: UsersService) {}

  user: User;
  role: string;

  canActivate(): boolean {
    
    let data = localStorage.getItem('data');
    let cypher = this.cryptoSvc.desencryptData(data, environment.firebase.apiKey);

    this.userSvc.getUserByEmail(cypher).subscribe( user => {
      this.role = user[0].role;
    });

    console.log(this.role);

    if (this.user.role === 'user') {
      this.router.navigate(['/dashboard']);
      return true;
    } else return false;
    
  }  
  
}

