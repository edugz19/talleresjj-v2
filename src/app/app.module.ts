import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { LocalNotifications} from '@ionic-native/local-notifications/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireRemoteConfigModule } from '@angular/fire/compat/remote-config';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireRemoteConfigModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    SignaturePadModule
  ],
  providers: [
    LocalNotifications,
    SplashScreen,
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
