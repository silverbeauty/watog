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
      this.id = this.id+1;
      return this.id;
    }
  }
  public element: any;
  public index: number;

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
    let i = 0;
    users.forEach(user => {
      user.addEventListener("click", () => {
        this.element = user;
      })
      if(user == this.element){
        this.index = i;
        console.log(i)
        this.navCtrl.push(ContestVoteSearchDetailPage, {user: this.data.users[this.index], from: 'currentUser'});
      }
      i++;
    })
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}
