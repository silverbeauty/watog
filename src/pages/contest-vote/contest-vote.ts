import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { VoteRandomPage } from '../vote-random/vote-random';
import { LoginPage } from '../login/login';
import { ContestSearchResultsPage } from '../contest-search-results/contest-search-results';
import { ProfilesLoadPage } from '../profiles-load/profiles-load';

import { DataProvider } from '../../providers/data/data';
import { RestProvider } from '../../providers/rest/rest';
import { User, Auth, Post } from '../../types';

/**
 * Generated class for the ContestVotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest-vote',
  templateUrl: 'contest-vote.html',
})
export class ContestVotePage {

  public data = {
    name: '',
    error: null
  }

  public mySearch: any;
  public random: any;
  public searchByName: any;
  public searchByKey: any;
  public allSearchUser: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public dataProvider: DataProvider) {
    this.random = this.restProvider.queryPost("?limit=100000&random");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestVotePage');
  }

  goBack() {
    this.navCtrl.pop();
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
    Promise.all([this.random]).then(data => {
      let allUser = []; //Needed for updates
      console.log("ma promise: ", data)
      for (let element in data){
        for(let all in data[element]){
          allUser.push(data[element][all]);
        }
      }
      console.log(allUser)
      const randomNum = Math.floor(Math.random() * allUser.length);
      this.navCtrl.push(ProfilesLoadPage, {user: allUser[randomNum], from: 'contestUser'});
    });
    // this.navCtrl.push(VoteRandomPage);
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

  onClickSearch() {
    console.info('Search:', this.data.name)
    // Set recent search
    DataProvider.searchUserName = this.data.name;
    let uFirstname = this.data.name.split(' ')[0];
    let uLastname = '';
    if(this.data.name.includes(" ") && this.data.name.split(' ')[1].length > 0){
      uLastname = this.data.name.split(' ')[1];
    }
    let myUsers = this.restProvider.queryUsers(uFirstname, uLastname)
    myUsers.then((users: Array<User>) => {
      console.log(users)
      return users
    }, err => {
      this.data.error = 'Failed to search, you can try again!'
    })
    
    myUsers.then(user => {
      this.searchByKey = this.restProvider.searchByKey(this.data.name);
      this.searchByName = this.restProvider.queryPost_(`?user_id=${user[0].id}`)
      this.mySearch = Promise.all([this.searchByName,this.searchByKey,this.random]);

      this.mySearch.then(data => {
        let tab = [];
        for(let i in data){
          for(let element in data[i]){
            console.log(data[i][element])
            if(!tab.includes(data[i][element])){
              tab.push(data[i][element])
            }
          }
        }
        console.log("my tab", tab)
        console.log("mySearch: ", data)


      }).catch((err: any) => {
        this.data.error = 'Failed to search, you can try again!'
      })
    })
  }

  checkFocus() {
    this.data.error = null;
  }
}
