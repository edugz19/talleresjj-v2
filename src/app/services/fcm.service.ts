import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor() { }

  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then( (permission) => {
      if (permission.receive === 'granted') {
        PushNotifications.register();
      }
    })

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('My token ' + JSON.stringify(token));
    })

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
      let audio = new Audio('../assets.mp3');

      audio.play();
      
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
