import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';
import { DataProvider } from '../../providers/data/data';
import { EmailComposer } from '@ionic-native/email-composer';
import { ModalLogout } from '../modal-logout/modal-logout';

/**
 * Generated class for the ContestSubmitedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest-submited',
  templateUrl: 'contest-submited.html',
})
export class ContestSubmitedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, private emailComposer: EmailComposer, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestSubmitedPage');
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
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
  }

  gotoInvite() {
    const title = "Dear friends, I invite you to take part to WATOG contest!";
    const body = `
      I offer you the possibility to participate to the FIGO World Congress in Rio de Janeiro from October 12th to 19th, 2018.

      The contest is for OB/GYN in training or specialists with less than 10 years of experience.

      The contest principles is to load one picture per category, the best category will win a FLIGHT to RIO, a FIGO Pass and residency during the Congress.
      Don't loose this opportunity !!

      Download the app, load your pics and try to win the packages !
    `;
    let email = {
      subject: title,
      body: body,
      isHtml: true
    };
    this.emailComposer.open(email);

  }

}
