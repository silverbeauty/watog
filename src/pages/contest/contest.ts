import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';

/* Providers */
import { DataProvider } from '../../providers/data/data';
import { VoteModalPage } from '../vote-modal/vote-modal';
import { ModalPrinciplesPage } from '../modal-principles/modal-principles';

/**
 * Generated class for the ContestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest',
  templateUrl: 'contest.html',
})
export class ContestPage {
  public data: DataProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestPage');
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

  goToParticipate(){
    //First show a modal
    this.navCtrl.push(ModalPrinciplesPage);
  }

  goToVote(){
    this.navCtrl.push(VoteModalPage);
  }

  logout(){
    console.log('not implemented yet');
  }
}
