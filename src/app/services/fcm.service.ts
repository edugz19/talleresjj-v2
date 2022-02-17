import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { User } from '../models/user.interface';
import { UsersService } from './users/users.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  user: User;

  constructor(
    private usersSvc: UsersService
  ) { }

  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then( (permission) => {
      if (permission.receive === 'granted') {
        alert('Granted');
        PushNotifications.register();
      }
    })

    PushNotifications.addListener('registration', (token: Token) => {
      alert('My token ' + token.value);

      // this.usersSvc.getUserByEmail('edugz19@outlook.es').subscribe( (user) => {
      //   this.user = user[0];

      //   // if (token.value !== this.user.devices[0]) this.user.devices.push(token.value);

      //   this.usersSvc.updateUser(this.user,this.user.id);

      // });
    })

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {

      alert('Mensaje recibido');
      
      LocalNotifications.schedule({
        notifications: [{
          id: 1,
          title: notification.title,
          body: notification.body
        }]
      })
    })

    PushNotifications.addListener('pushNotificationActionPerformed', async (notification: ActionPerformed) => {
      const data = notification.notification.data;
      console.log('Action performed: ' + JSON.stringify(notification.notification));
      alert('Action performed: ' + notification.notification);
    })
  }
}
