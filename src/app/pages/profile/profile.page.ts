import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { CryptoService } from 'src/app/services/crypto/crypto.service';
import { UsersService } from 'src/app/services/users/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user!: User;

  data: string = localStorage.getItem('data');
  key: string = environment.firebase.apiKey;

  private destroy$ = new Subject<any>();

  constructor(
    private userSvc: UsersService, 
    public router: Router, 
    private cryptoSvc: CryptoService
    ) { }

  ngOnInit() {
    let cypher = this.cryptoSvc.desencryptData(this.data,this.key);

    this.userSvc.getUserByEmail(cypher).subscribe( user => {
      this.user = user[0]; 
    });
  }

  // format(date: string): string {
  //   let dateFormat = moment(date).format("Y/M/D HH:mm");
  //   return dateFormat;    
  // }

  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }

  return():void {
    this.router.navigate(['/dashboard']);
  }

}
