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
import { SelectionPage } from '../selection/selection';

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
  public picture: any = null;
  public userAlreadyVoted: any = false;
  public page: any;
  public infoUser: any = null;
  public promise: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public navParams: NavParams, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestSearchResultsPage');
    this.promise = Promise.all([this.restProvider.getAllPost()])
    this.promise.then(data => {
      //console.log("first", data)
      this.picture = data[0]
      this.infoUser = DataProvider.searchedUsers;
      console.log("pic: ", this.picture)
      if(this.picture && this.infoUser){
        this.picture.forEach(mesId => {
          this.infoUser.forEach(user =>{
            if(user.id == mesId.user_id){
              this.data.users.push(mesId.User)
            }
          })
        })
      }
      return this.data.users;
    });
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
    this.promise.then(() => {
      let users = Array.from(document.querySelectorAll("#allUser"));
      let collectUser: any = [];
      for (let usr in users){
        collectUser.push(usr);
      }
      let i = 0;
      users.forEach(user => {
        user.addEventListener("click", () => {
          this.element = user;
        })
        if(user == this.element && this.picture){
          this.index = i;
          console.log(i)
          this.navCtrl.push(this.goToSearchPage(), {user: this.picture[this.index], from: 'currentUser'});
        }
        i++;
      })
    });
  }

  goToSearchPage(): any{
    this.page = SelectionPage;
    if(this.userAlreadyVoted){
      this.page = ContestVoteSearchDetailPage;
    }
    return this.page
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}
