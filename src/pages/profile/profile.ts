import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { SettingsPage } from '../settings/settings';
import { DataProvider, RestProvider } from '../../providers';
import { User, Auth } from '../../types';
import { LoginPage } from '../login/login';
import { ProfilesLoadPage } from '../profiles-load/profiles-load';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public auth: Auth

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public restProvider: RestProvider) {
    this.auth = DataProvider.auth
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    
    // Load local profile
    this.auth = DataProvider.auth;
    if (!this.auth.picture_profile) {
      this.auth.picture_profile = 'assets/icon/Profil.png';
    }
    // Load profile by API
    this.restProvider.getProfile().then( (auth: Auth) => {
      this.auth = auth;
      if (!this.auth.picture_profile) {
        this.auth.picture_profile = 'assets/icon/Profil.png';
      }
      // Save profile
      return this.dataProvider.saveProfile(auth);
    }).catch(err => {
      console.error(err)
    })
  }
/*
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
      this.navCtrl.push(ProfilesLoadPage)
    })
    .catch( err => {
      console.log("You have already voted")
    })
  }
*/
  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}
/*
const myProfil = "?user_id=" + this.userId;

this.restProvider.getAllPost(myProfil).then(data => {
  console.log("getpost", data)
  this.me = data;
})
.catch(err => {
  console.log('Is just cordova')
})
*/
