import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
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
  rootPage:any = DashboardPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public dataProvider: DataProvider, public restProvider: RestProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.dataProvider.getProfile().then((auth: Auth) => {
        RestProvider.token = auth.token; // Set auth token
        return this.restProvider.getProfile() // fetch profile again
      }).then((auth: Auth) => {
        if (auth.proof_of_status) {
          if (!auth.sms_verified_date && !auth.email_verified_date) { // Email or cell_phone is not verified
            this.rootPage = RegisterThreeOfThreePage; // proof_of_status not uploaded
          } else {
            this.rootPage = DashboardPage;
          }
        } else {
          this.rootPage = RegisterTwoOfThreePage; // verified
        }
      }).catch((e: any) => {
        this.dataProvider.clearProfile() // Clear profile and token
        this.rootPage = LoginPage; // Go to login page
      })

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
