import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  public vote: any;
  public description: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public dataProvider: DataProvider, public restProvider: RestProvider) {
    this.auth = DataProvider.auth
    console.log(this.auth)
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

  reported(img){
    let alert = this.alertCtrl.create({
      title: 'Spam',
      subTitle: 'Dou you really want report this picture ?',
      buttons: [
        { text: 'Spam', handler: () =>{
          this.vote.type = 'spam'
        }},
        { text: 'violence', handler: () => {
          this.vote.type = 'violence'
        }},
        { text: 'sex', handler: () => {
          this.vote.type = 'sex'
        }},
        { text: 'other', handler: () => {
          this.vote.type = 'other'
        }}]
    });
    alert.present();
    console.log(this.vote)
    this.vote.description = this.description;
    this.Voted(img.id)
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
    const makeVote = "/"+ id +"/vote"
    console.log("vote: ", this.vote)
    this.restProvider.Voted(this.vote, makeVote).then(data => {

    })
    .catch( err => {
      console.log("You have already voted")
    })
  }

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
