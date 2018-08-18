import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';

/* Providers */
import { DataProvider } from '../../providers/data/data';
import { ParticipatePage } from '../participate/participate';
import { ContestVotePage } from '../contest-vote/contest-vote';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    this.navCtrl.push(ParticipatePage);
  }

  goToVote(){
    this.navCtrl.push(ContestVotePage);
  }

  logout(){
    console.log('not implemented yet');
  }

}
