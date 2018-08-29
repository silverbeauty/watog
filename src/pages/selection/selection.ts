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
 * Generated class for the SelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selection',
  templateUrl: 'selection.html',
})
export class SelectionPage {
  public userInfo: any;
  public imageInfo: any = null;
  public currentUser: any;
  public vote: any = {
    commend: true
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public restProvider: RestProvider) {
    const params = this.navParams.data.user;
    this.currentUser = params;
    const mySearch = "?user_id=" + this.currentUser.id;
    this.restProvider.getAllPost(mySearch).then(data => {
      this.imageInfo = data;
      console.log(data)
    })
  }

  ionViewDidLoad() {
    console.log(DataProvider.searchedUsers)
  }

  getUser(user){
    console.log(user)
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
      this.navCtrl.push(SelectionPage, { user: this.currentUser })
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
