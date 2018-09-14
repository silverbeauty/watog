import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { FuturNearTermGoalsPage } from '../futur-near-term-goals/futur-near-term-goals';
import { LoginPage } from '../login/login';
import { DataProvider } from '../../providers/data/data';
import { ModalLogout } from '../modal-logout/modal-logout';
/**
 * Generated class for the AccomplishmentsToDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accomplishments-to-date',
  templateUrl: 'accomplishments-to-date.html',
})
export class AccomplishmentsToDatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccomplishmentsToDatePage');
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

  goBack(){
    this.navCtrl.pop();
  }

  goToFutur(){
    this.navCtrl.push(FuturNearTermGoalsPage);
  }

  logout(){
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
  }

}
