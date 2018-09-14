import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
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
import { User, Auth, Post } from '../../types';
import { ModalLogout } from '../modal-logout/modal-logout';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public dataProvider: DataProvider, public restProvider: RestProvider, public modalCtrl: ModalController) {
    
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
    this.goToNextPage(1, BestUltrasoundImagePage, 'Ultrasound')
  }

  goToBestSurgicalImage(){
    let myCategorieId = 5;
    this.goToNextPage(5, BestSurgicalImagePage, 'Surgical')
  }

  goToBestPhotoWithWatogLogo(){
    this.goToNextPage(2, BestPhotoWithTheWatogLogoPage, 'Watog_logo');
  }

  gotToBestGroupPhotoWithTheWatogLogo(){
    this.goToNextPage(4, BestGroupPhotoWithTheWatogLogoPage, 'best_OB_GYN_Watog_logo');
  }

  goToBestHumanitaryPhoto(){
    this.goToNextPage(3, BestHumanitaryPhotoPage, 'Humanitary');
  }

  goToNextPage(categoryId: number, page, from) {
    const { id } = DataProvider.auth; // user id
    this.restProvider.queryPost(`?category_id=${categoryId}&user_id=${id}`)
      .then((posts: Array<Post>) => {
        if (posts.length > 0) { // already uploaded
          this.presentAlert()
        } else {
          this.navCtrl.push(page, { id: categoryId , from });
        }
      }).catch(e => {
        this.presentRetry()
      })
  }

  presentRetry() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'Failed to check your photos, please try again!',
      buttons: ['OK']
    });
    alert.present();
  }


  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'You have already uploaded a photo for this category!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  goBack(){
    this.navCtrl.pop();
  }

  logout(){
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
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
