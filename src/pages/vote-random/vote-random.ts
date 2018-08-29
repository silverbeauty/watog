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
  public allUser: any =  [];
  public vote: any = {
    commend: true
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public restProvider: RestProvider) {
    console.log(DataProvider.searchedUsers)
  }

  ionViewDidLoad() {
    let cat1 = this.restProvider.getAllPost("?category_id=1");
    let cat2 = this.restProvider.getAllPost("?category_id=2");
    let cat3 = this.restProvider.getAllPost("?category_id=3");
    let cat4 = this.restProvider.getAllPost("?category_id=4");
    let cat5 = this.restProvider.getAllPost("?category_id=5");


    Promise.all([cat1, cat2, cat3, cat4, cat5]).then(data => {
      console.log("ma promise: ", data)
      for (let element in data){
        for(let all in data[element]){
          this.allUser.push(data[element][all]);
        }
      }
      console.log(this.allUser)
    });
  }

  voteUp(img){
    this.vote.commend = true;
    this.Voted(img.id)
  }

  voteDown(img){
    this.vote.commend = false;
    this.Voted(img.id)
  }

  Voted(id: number){
    //this.vote check to user ng
    const makeVote = "/"+ id +"/vote"
    console.log("vote: ", this.vote)
    this.restProvider.Voted(this.vote, makeVote).then(data => {
      this.navCtrl.push(VoteRandomPage)
    })
    .catch( err => {
      console.log("You have already voted")
    })
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
