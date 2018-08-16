import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { MissionOfWatogPage } from '../mission-of-watog/mission-of-watog';
import { OrganizationPage } from '../organization/organization';
import { AccomplishmentsToDatePage } from '../accomplishments-to-date/accomplishments-to-date';
import { FuturNearTermGoalsPage } from '../futur-near-term-goals/futur-near-term-goals';

/**
 * Generated class for the WhatIsWatogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-what-is-watog',
  templateUrl: 'what-is-watog.html',
})
export class WhatIsWatogPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhatIsWatogPage');
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

  logout(){
    console.log('not implemented yet');
  }

  goToMission(){
    this.navCtrl.push(MissionOfWatogPage);
  }

  goToOrganization(){
    this.navCtrl.push(OrganizationPage);
  }

  goToAccomplishments(){
    this.navCtrl.push(AccomplishmentsToDatePage);
  }

  goToFutur(){
    this.navCtrl.push(FuturNearTermGoalsPage);
  }


}
