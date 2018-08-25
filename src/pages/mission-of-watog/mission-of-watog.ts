import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { OrganizationPage } from '../organization/organization';
import { WhatIsWatogPage } from '../what-is-watog/what-is-watog';
import { LoginPage } from '../login/login';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the MissionOfWatogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mission-of-watog',
  templateUrl: 'mission-of-watog.html',
})
export class MissionOfWatogPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MissionOfWatogPage');
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

  goToOrganization(){
    this.navCtrl.push(OrganizationPage);
  }

  goToWhatIsWatog(){
    this.navCtrl.push(WhatIsWatogPage);
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}
