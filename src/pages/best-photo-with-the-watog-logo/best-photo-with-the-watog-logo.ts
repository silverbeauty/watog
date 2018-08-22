import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { ContestSubmitPage } from '../contest-submit/contest-submit';

/**
 * Generated class for the BestPhotoWithTheWatogLogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-best-photo-with-the-watog-logo',
  templateUrl: 'best-photo-with-the-watog-logo.html',
})
export class BestPhotoWithTheWatogLogoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestPhotoWithTheWatogLogoPage');
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

  goNext(){
    var consent = <HTMLInputElement> document.getElementById("consentCertified");
    if(consent.checked == true){
      this.goToContestSubmit();
    } else {
      document.getElementById("certifyConsent").style.backgroundColor = "#e40046";
    }
  }

  logout(){
    console.log('not implemented yet');
  }

}
