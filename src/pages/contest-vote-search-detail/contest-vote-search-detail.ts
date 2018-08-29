import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { VoteRandomPage } from '../vote-random/vote-random';
import { SelectionPage } from '../selection/selection';
import { LoginPage } from '../login/login';

import { DataProvider } from '../../providers/data/data';
import { RestProvider } from '../../providers/rest/rest';
import { User, Auth } from '../../types';

/**
 * Generated class for the ContestVoteSearchDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest-vote-search-detail',
  templateUrl: 'contest-vote-search-detail.html',
})
export class ContestVoteSearchDetailPage {
  public myUserPic: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public rest: RestProvider) {
    const params = this.navParams.data;
    this.myUserPic = params.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestVoteSearchDetailPage');

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

  goToVoteRandom(){
    //this.navCtrl.push(SelectionPage, {user: this.picture[this.index], from: 'currentUser'});
  }

  goBack(){
    this.navCtrl.pop();
  }

  goChange(){
    this.navCtrl.push(VoteRandomPage);
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}
