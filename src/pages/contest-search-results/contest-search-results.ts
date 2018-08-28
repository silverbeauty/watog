import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';

import { DataProvider } from '../../providers/data/data';
import { RestProvider } from '../../providers/rest/rest';
import { User, Auth } from '../../types';
import { ContestVoteSearchDetailPage } from '../contest-vote-search-detail/contest-vote-search-detail';

/**
 * Generated class for the ContestSearchResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest-search-results',
  templateUrl: 'contest-search-results.html',
})
export class ContestSearchResultsPage {

  public data = {
    users: []
  }
  public cpt = {
    id: 0,
    inc: function(){
      this.id++;
      return this.id;
    }
  }

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public navParams: NavParams, public dataProvider: DataProvider) {
    //this.data.users =
    //console.log(DataProvider.searchedUsers)
    Promise.all([this.restProvider.getAllPost()]).then(data => {
      //console.log("first", data)
      data[0].forEach(mesId => {
        DataProvider.searchedUsers.forEach(user =>{
          if(user.id == mesId.user_id){
            this.data.users.push(mesId.User)
          }
        })
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestSearchResultsPage');

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

  goToSearch(){
    let users = document.querySelectorAll("#allUser");
    this.navCtrl.push(ContestVoteSearchDetailPage, {user: this.data.users, from: 'users_profile'});
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}
