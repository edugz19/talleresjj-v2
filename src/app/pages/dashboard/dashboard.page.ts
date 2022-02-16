import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';
import { CryptoService } from 'src/app/services/crypto/crypto.service';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';
import { getRemoteConfig, getValue, fetchAndActivate } from '@angular/fire/remote-config';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { LocalNotifications } from '@capacitor/local-notifications'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  isAdmin: boolean = false;
  user!: User;
  key: string;

  private destroy$ = new Subject<any>();

  constructor(
    private userSvc: UsersService,
    private cryptoSvc: CryptoService,
    private af: AngularFireRemoteConfig,
    private msSvc: MessagingService
    ) {}

  async ngOnInit() {
    await LocalNotifications.requestPermissions();
    const remoteConfig = getRemoteConfig();

    fetchAndActivate(remoteConfig)
      .then(() => {
        this.key = getValue(remoteConfig, "api_key").asString();

        let data = localStorage.getItem('data');

        let cypher = this.cryptoSvc.desencryptData(data, this.key);
    
        this.userSvc.getUserByEmail(cypher).subscribe( user => {
          this.user = user[0];
          if (this.user['role'] === 'admin') this.isAdmin = true;
          else this.isAdmin = false;
        });

      })
      .catch((err) => {
        console.log('It is not possible recover data from remote config');
      });

      this.msSvc.requestPermission();

  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
