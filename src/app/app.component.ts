import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';

import { LandingPage } from '../pages/landing/landing';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterOneOfThreePage } from '../pages/register-one-of-three/register-one-of-three';
import { RegisterTwoOfThreePage } from '../pages/register-two-of-three/register-two-of-three';
import { RegisterThreeOfThreePage } from '../pages/register-three-of-three/register-three-of-three';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { WhatIsWatogPage } from '../pages/what-is-watog/what-is-watog';
import { ModalPrinciplesPage } from '../pages/modal-principles/modal-principles';
import { VoteModalPage } from '../pages/vote-modal/vote-modal';
//import { SettingsPage } from '../pages/settings/settings';

import { DataProvider, RestProvider } from '../providers';
import { User, Auth } from '../types';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage: any = LandingPage;
  rootPage: any = DashboardPage;
  @ViewChild(Nav) nav: Nav;
  showSplash = false;
  user: any;

  constructor(public app: App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public dataProvider: DataProvider, public restProvider: RestProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.dataProvider.getProfile().then((user) => {
      this.user = user;
    });
  }

  goToPage(x: string) {
    if (x === 'watog') {
      this.nav.push(WhatIsWatogPage);
    } else if (x === 'princ') {
      this.nav.push(ModalPrinciplesPage);
    } else if (x === 'vote') {
      this.nav.push(VoteModalPage);
    }
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
