import { Component } from '@angular/core';
import { Platform, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LandingPage } from '../pages/landing/landing';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterOneOfThreePage } from '../pages/register-one-of-three/register-one-of-three';
import { RegisterTwoOfThreePage } from '../pages/register-two-of-three/register-two-of-three';
import { RegisterThreeOfThreePage } from '../pages/register-three-of-three/register-three-of-three';

import { DashboardPage } from '../pages/dashboard/dashboard';
//import { SettingsPage } from '../pages/settings/settings';
import { DataProvider, RestProvider } from '../providers';
import { User, Auth } from '../types';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LandingPage;

  constructor(public app: App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public dataProvider: DataProvider, public restProvider: RestProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
<<<<<<< HEAD
      this.dataProvider.getProfile().then((auth: Auth) => {
        if (auth) {
          if (auth.proof_of_status) {
            this.rootPage = RegisterThreeOfThreePage; // proof_of_status not uploaded
          } else if (!auth.sms_verified_date && !auth.email_verified_date){
            this.rootPage = RegisterTwoOfThreePage; // verified
          } else {
            this.rootPage = DashboardPage; // proof_of_status not uploaded
          }
        } else {
          this.rootPage = DashboardPage; // Go to login page
        }
      }).catch((e: any) => {
        this.rootPage = DashboardPage; // Go to login page
      })

=======
>>>>>>> ionic-front/master
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

/*this.dataProvider.getProfile().then((auth: Auth) => {
        RestProvider.token = auth.token; // Set auth token
        return this.restProvider.getProfile() // fetch profile again
      }).then((auth: Auth) => {
        if (auth.proof_of_status) {
          if (!auth.sms_verified_date && !auth.email_verified_date) { // Email or cell_phone is not verified
            this.navCtrl.push(RegisterThreeOfThreePage); // proof_of_status not uploaded
          } else {
            this.navCtrl.push(DashboardPage)
          }
        } else {
          this.navCtrl.push(RegisterTwoOfThreePage)
        }
      }).catch((e: any) => {
        this.dataProvider.clearProfile() // Clear profile and token
        this.navCtrl.push(LoginPage)
      })*/