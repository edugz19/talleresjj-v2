import { Component } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initialize();
  }

  initialize(){
    PushNotifications.addListener('pushNotificationReceived',
      async (notification) => {
        console.log('Notificación recibida: ' , notification)
        let jsonData: JSON = JSON.parse(JSON.stringify(notification.data))

        console.log(jsonData);
      }  
    )
  }
}
