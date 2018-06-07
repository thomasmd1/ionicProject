import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Camera} from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { AuthPage } from '../pages/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { PhotoPage } from '../pages/photo/photo'
import { AddPage } from '../pages/add/add'

import { Provider } from '../providers/provider/provider';
import { AuthProvider } from '../providers/auth/auth';
import { ConcertProvider } from '../providers/concert/concert';

export const firebaseConfig = {
  apiKey: "AIzaSyCm7L7ZsrYZNylgIT4Uew7CNU1tPvtqYOU",
  authDomain: "ynovionic.firebaseapp.com",
  databaseURL: "https://ynovionic.firebaseio.com",
  projectId: "ynovionic",
  storageBucket: "",
  messagingSenderId: "229301763583"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    AuthPage,
    TabsPage,
    PhotoPage,
    AddPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    AuthPage,
    TabsPage,
    PhotoPage,
    AddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Provider,
    AuthProvider,
    ConcertProvider
  ]
})
export class AppModule { }
