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
import { LoginPage } from '../login/login';
import { DataProvider, RestProvider } from '../../providers';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public restProvider: RestProvider) {
    
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
    let myCategorieId = 1;
    this.navCtrl.push(BestUltrasoundImagePage, { id: myCategorieId , from: 'Ultrasound' });
  }

  goToBestSurgicalImage(){
    let myCategorieId = 5;
    this.navCtrl.push(BestSurgicalImagePage, { id: myCategorieId , from: 'Surgical' });
  }

  goToBestPhotoWithWatogLogo(){
    let myCategorieId = 2;
    this.navCtrl.push(BestPhotoWithTheWatogLogoPage, { id: myCategorieId , from: 'Watog_logo' });
  }

  gotToBestGroupPhotoWithTheWatogLogo(){
    let myCategorieId = 4;
    this.navCtrl.push(BestGroupPhotoWithTheWatogLogoPage, { id: myCategorieId , from: 'best_OB_GYN_Watog_logo' });
  }

  goToBestHumanitaryPhoto(){
    let myCategorieId = 3;
    this.navCtrl.push(BestHumanitaryPhotoPage, { id: myCategorieId , from: 'Humanitary' });
  }

  goBack(){
    this.navCtrl.pop();
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}

/******
Create categories only for the admin

public photo = {
  "types":[
    {'type':'Ultrasound'},
    {'type':'Watog_logo'},
    {'type':'Humanitary'},
    {'type':'Surgical'},
    {'type':'best_OB_GYN_Watog_logo'}
  ]
}

this.photo.types.forEach(category => {
  Promise.all([this.restProvider.createCategory(category)]).then((data) => {
    console.log(data)
  })
})

*******/
