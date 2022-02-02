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

  postMessageData(title, ) {
    const url = 'https://fcm.googleapis.com/fcm/send';
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "key=" + environment.server_key
    });

    const body = {
      "notification": {
        "title": "New task available.", 
        "body": "New task is available to do (" + title + ")",
        },
        "to" : "/topics/tasks",
        "data" : {
          "volume" : "3.21.15",
          "contents" : "http://www.news-magazine.com/world-week/21659772"
        },
    }

    return this.http.post(url, body, { headers: headers })
      .subscribe( 
        data => console.log('success: ', data),
        error => console.log('error; ', error)
      )
  }
}
