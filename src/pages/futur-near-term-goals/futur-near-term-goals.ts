import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { WhatIsWatogPage } from '../what-is-watog/what-is-watog';

/**
 * Generated class for the FuturNearTermGoalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-futur-near-term-goals',
  templateUrl: 'futur-near-term-goals.html',
})
export class FuturNearTermGoalsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuturNearTermGoalsPage');
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  goToWhatIsWatog(){
    this.navCtrl.push(WhatIsWatogPage);
  }

  logout(){
    console.log('not implemented yet');
  }

}
