import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CryptoService } from 'src/app/services/crypto/crypto.service';
import { UsersService } from 'src/app/services/users/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isAdmin = false;
  user: User;
  key: string = environment.firebase.apiKey;

  private destroy$ = new Subject<any>();

  constructor(
    private authSvc: AuthService, 
    public menu: MenuController, 
    public router: Router,
    private userSvc: UsersService,
    private cryptoSvc: CryptoService
    ) { }

  ngOnInit(): void {
    const data = localStorage.getItem('data');

    if (data != null) {
      const cypher = this.cryptoSvc.desencryptData(data, this.key);

      this.userSvc.getUserByEmail(cypher).subscribe( user => {
        this.user = user[0];
        if (this.user["role"] === 'admin') { this.isAdmin = true; }
        else { this.isAdmin = false; }
      });
    }
  }
  
  // ngOnDestroy(): void {
  //   this.destroy$.next({});
  //   this.destroy$.complete();
  // }

  onExit(): void {
    this.authSvc.logout();
    this.menu.close();
    localStorage.removeItem('data');
    this.router.navigate(['login']);
  }

}
