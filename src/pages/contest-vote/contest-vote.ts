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
import {User, Auth, Post} from '../../types';

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
  public posts: Array<Post> = [];
  public searchByKey: any;
  public searchByName: any;
  public mySearch: any;
  public random: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public dataProvider: DataProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestVotePage');
    Promise.all([this.restProvider.queryCategories()]).then(data => console.log("des data",data))
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
    /*Promise.all([this.restProvider.queryPost("?limit=100000")]).then(data => {
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
    });*/
    // this.navCtrl.push(VoteRandomPage);
    this.data.name ="";
    this.restProvider.queryUsers(this.data.name).then((users: Array<User>) => {
      DataProvider.searchedUsers = users;
      DataProvider.searchUserOffset = 0;
      // this.navCtrl.push(ContestSearchResultsPage, { users: users });
      const randomNum = Math.floor(Math.random() * users.length);
      console.log("users", users)
      console.log("randomNum", randomNum)
      this.restProvider.queryPost_(`?user_id=${users[randomNum].id}`).then((posts: Array<Post>) => {
        this.posts = posts;
        console.info('Posts Fetched:', this.posts)
      });
    }).catch((err: any) => {
      this.data.error = 'Failed to search, you can try again!'
    })

    this.restProvider.queryPost_(`?keyword=${this.data.name}`).then((res: Array<Post>) => {
      console.log("befor",this.posts)
      this.posts = this.posts.concat(res);
      console.log("posts", this.posts)
      const randomNum = Math.floor(Math.random() * this.posts.length);
      this.navCtrl.push(ProfilesLoadPage, { post: this.posts[randomNum], from: "contestUser" });
    }).catch((e: any) => {
      console.info(e)
      return null;
    })
  }

  onSearchClick() {
    console.info('Search:', this.data.name)
    // Set recent search
    DataProvider.searchUserName = this.data.name;

    let myUsers = this.restProvider.queryUsers(this.data.name).then((users: Array<User>) => {
      DataProvider.searchedUsers = users;
      DataProvider.searchUserOffset = 0;
       // this.navCtrl.push(ContestSearchResultsPage, { users: users });
       return users
    }).catch((err: any) => {
      this.data.error = 'Failed to search, you can try again!'
    })

    myUsers.then(user => {
      //const randomNum = Math.floor(Math.random() * user.length);
      console.log("mon user:  ",user)
      this.searchByKey = this.restProvider.searchByKey(this.data.name);
      this.searchByName = this.restProvider.queryPost_(`?user_id=${user[0].id}`)
      this.mySearch = Promise.all([this.searchByName,this.searchByKey]);

      this.mySearch.then(data => {
        let tab: Array<any> = [];
        for(let i in data){
          for(let element in data[i]){
            if(!tab.includes(data[i][element])){
              tab.push(data[i][element])
            }
          }
        }
        console.log("my tab", tab)
        console.log("mySearch: ", data)
        this.navCtrl.push(ProfilesLoadPage, {post: tab, from: 'searchUser'});

      }).catch((err: any) => {
        this.data.error = 'Failed to search, you can try again!'
      })
    })
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

  onRandomClick() {
    console.info('Search:', this.data.name)
    // Set recent search
    DataProvider.searchUserName = this.data.name;

    this.restProvider.queryUsers(this.data.name).then((users: Array<User>) => {
      DataProvider.searchedUsers = users;
      DataProvider.searchUserOffset = 0;
       // this.navCtrl.push(ContestSearchResultsPage, { users: users });
       const randomNum = Math.floor(Math.random() * users.length);
       console.log("users", users)
       console.log("randomNum", randomNum)
       this.restProvider.queryPost_(`?user_id=${users[randomNum].id}`).then((posts: Array<Post>) => {
         this.posts = posts;
         console.info('Posts Fetched:', this.posts)
      });
    }).catch((err: any) => {
      this.data.error = 'Failed to search, you can try again!'
    })

    this.restProvider.queryPost_(`?keyword=${this.data.name}`).then((res: Array<Post>) => {
      console.log("befor",this.posts)
      this.posts = this.posts.concat(res);
      console.log("posts", this.posts)
      const randomNum = Math.floor(Math.random() * this.posts.length);
      this.navCtrl.push(ProfilesLoadPage, { post: this.posts[randomNum], from: "contestUser" });
    }).catch((e: any) => {
      console.info(e)
      return null;
    })
  }

  checkFocus() {
    this.data.error = null;
  }
}
