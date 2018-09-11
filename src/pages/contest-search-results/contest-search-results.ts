import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';
import { ProfilesLoadPage } from '../profiles-load/profiles-load';
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
  public infoKeyword: any = null;
  public promise: any;
  public info: any = [];
  public myUsers: any;
  public keyword: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public navParams: NavParams, public dataProvider: DataProvider) {
    const Params = this.navParams.data;
    this.myUsers = Params.users;
    this.keyword = Params.keyword;
    this.infoUser = { users: this.myUsers }
    this.infoKeyword = { keyword: this.keyword }
    console.log(this.myUsers)
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

  public goToSearch(user){
    console.log(user)
    this.navCtrl.push(ProfilesLoadPage, {post: user, from: 'contestUser'});
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }
}

/***

let monTab = [];
let otherTab = [];
const end = this.picture.length - 1
this.picture = data[0]
this.infoUser = DataProvider.searchedUsers;
console.log("pic: ", this.picture)
if(this.picture && this.infoUser){
  this.picture.forEach(mesId => {
    this.infoUser.forEach(user =>{
      if(user.id == mesId.user_id){
        //A
        this.data.users.push(mesId.User)
        this.info.push(mesId)
        console.log("derniere element: ",this.picture[0])
      }
    })
  })
}

***/
