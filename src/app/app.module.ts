import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { AlertController } from 'ionic-angular';

	/*Components*/
import { MyApp } from './app.component';

	/*Pages*/
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterOneOfThreePage } from '../pages/register-one-of-three/register-one-of-three';
import { LandingPage } from '../pages/landing/landing';

<<<<<<< HEAD
=======
	/*Provider*/
>>>>>>> ionic-front/master
import { DataProvider } from '../providers/data/data';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
<<<<<<< HEAD
	  LoginPage,
	  RegisterOneOfThreePage,
    LandingPage
=======
	LoginPage,
	RegisterOneOfThreePage,
	LandingPage,
>>>>>>> ionic-front/master
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
<<<<<<< HEAD
	  LoginPage,
	  RegisterOneOfThreePage,
    LandingPage
=======
	LoginPage,
	RegisterOneOfThreePage,
	LandingPage,
>>>>>>> ionic-front/master
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    SQLite
  ]
})
export class AppModule {}
