import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';

import { DataProvider } from '../../providers/data/data';
import { RestProvider } from '../../providers/rest/rest';
import { User, Auth } from '../../types';

/**
 * Generated class for the VoteRandomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vote-random',
  templateUrl: 'vote-random.html',
})
export class VoteRandomPage {
  public allUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public restProvider: RestProvider) {
    console.log(DataProvider.searchedUsers)
  }

  ionViewDidLoad() {
  /*  let myCard = document.getElementById("cardImg")
    myCard.style.cssText=`
    background-image: url('../../assets/imgs/Watog.jpg');
  `;*/
    Promise.all([this.restProvider.getAllPost()]).then(data => {
      this.allUser = data[0]
      console.log(this.allUser)
    });
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToProfilePage(){
    this.navCtrl.push(LoginPage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}
