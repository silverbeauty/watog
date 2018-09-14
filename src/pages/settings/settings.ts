import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { ChangePasswordPage } from '../change-password/change-password';
import { LoginPage } from '../login/login';
import { DataProvider } from '../../providers/data/data';
import { ModalLogout } from '../modal-logout/modal-logout';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  goToEditProfile(){
    this.navCtrl.push(EditProfilePage);
  }

  gotToChangePassword(){
    this.navCtrl.push(ChangePasswordPage);
  }

  logout(){
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
  }
  goBack(){
    this.navCtrl.pop();
  }

}
