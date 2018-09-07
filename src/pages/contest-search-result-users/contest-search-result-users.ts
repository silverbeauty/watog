import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilesLoadPage } from "../profiles-load/profiles-load";
import { DashboardPage } from "../dashboard/dashboard";
import { LoginPage } from "../login/login";
import { SettingsPage } from "../settings/settings";
import { ProfilePage } from "../profile/profile";
import { DataProvider } from '../../providers/data/data';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ContestSearchResultUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest-search-result-users',
  templateUrl: 'contest-search-result-users.html',
})
export class ContestSearchResultUsersPage {

  public myUsers: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
    const Users = this.navParams.data;
    this.myUsers = Users.users;
    console.log(this.myUsers)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestSearchResultUsersPage');
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

  public goToSearch(user){
    this.navCtrl.push(ProfilesLoadPage, {user: user, from: 'contestUser'});
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}
