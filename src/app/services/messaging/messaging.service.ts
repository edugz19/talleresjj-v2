import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private afMessaging: AngularFireMessaging, private http: HttpClient) { }

  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {          
          console.log(token);
          this.subscribeTokenToTopic(token, 'tasks');
        },
        (error) => { console.log(error); }
    )  
  }

  subscribeTokenToTopic(token, topic) {
    fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'key=' + environment.server_key      
      })
    })
    .then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
      }
      console.log('Subscribed to "'+topic+'"');
    }).catch(error => {
      console.error(error);
    })
  }

  postMessageData(title, token) {
    const url = 'https://fcm.googleapis.com/fcm/send';
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "key=" + environment.server_key
    });

    const body = {
      notification: {
        title: "New task available to do",
        body: title,
        icon: "../../assets/icon/favicon.png",
        click_action: 'http://localhost:8100/tasks',
        image: "../../assets/images/tasks.png"
      },
      data: {
        title: "New task available to do",
        body: title
      },
      to: token
    }

    return this.http.post(url, body, { headers: headers })
      .subscribe( 
        data => console.log('success: ', data),
        error => console.log('error; ', error)
      )
  }
}
