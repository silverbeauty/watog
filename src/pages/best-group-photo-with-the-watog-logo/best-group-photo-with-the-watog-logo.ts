import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { ContestSubmitPage } from '../contest-submit/contest-submit';


/**
 * Generated class for the BestGroupPhotoWithTheWatogLogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-best-group-photo-with-the-watog-logo',
  templateUrl: 'best-group-photo-with-the-watog-logo.html',
})
export class BestGroupPhotoWithTheWatogLogoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestGroupPhotoWithTheWatogLogoPage');
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

  goToContestSubmit(){
    this.navCtrl.push(ContestSubmitPage);
  }

  goBack(){
    this.navCtrl.pop();
  }

  logout(){
    console.log('not implemented yet');
  }

}
