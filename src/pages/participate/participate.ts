import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { BestUltrasoundImagePage } from '../best-ultrasound-image/best-ultrasound-image';
import { BestSurgicalImagePage } from '../best-surgical-image/best-surgical-image';
import { BestPhotoWithTheWatogLogoPage } from '../best-photo-with-the-watog-logo/best-photo-with-the-watog-logo';
import { BestGroupPhotoWithTheWatogLogoPage } from '../best-group-photo-with-the-watog-logo/best-group-photo-with-the-watog-logo';
import { BestHumanitaryPhotoPage } from '../best-humanitary-photo/best-humanitary-photo';

/**
 * Generated class for the ParticipatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-participate',
  templateUrl: 'participate.html',
})
export class ParticipatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticipatePage');
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

  goToBestUltrasoundImage(){
    this.navCtrl.push(BestUltrasoundImagePage);
  }

  goToBestSurgicalImage(){
    this.navCtrl.push(BestSurgicalImagePage);
  }

  goToBestPhotoWithWatogLogo(){
    this.navCtrl.push(BestPhotoWithTheWatogLogoPage);
  }

  gotToBestGroupPhotoWithTheWatogLogo(){
    this.navCtrl.push(BestGroupPhotoWithTheWatogLogoPage);
  }

  goToBestHumanitaryPhoto(){
    this.navCtrl.push(BestHumanitaryPhotoPage);
  }

  goBack(){
    this.navCtrl.pop();
  }

  logout(){
    console.log('not implemented yet');
  }

}
