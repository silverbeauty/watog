import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { SettingsPage } from '../settings/settings';
import { DataProvider, RestProvider } from '../../providers';
import { User, Auth } from '../../types';
import { LoginPage } from '../login/login';
import { ProfilesLoadPage } from '../profiles-load/profiles-load';
import { BestPhotoPage } from '../best-photo/best-photo'

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
      // Load profile by API
      this.auth.picture_profile = 'assets/icon/Profil.png';
    }
    this.restProvider.getProfile().then( (auth: Auth) => {
      this.auth = auth;
      if (!this.auth.picture_profile) {
        this.auth.picture_profile = 'assets/icon/Profil.png';
      }
      this.dataProvider.saveProfile(auth);
    }).catch(err => {
      console.error(err)
    })
    this.restProvider.queryBestPost('1').then((string:String)=>{
      console.log('string',string);
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

  goToBestPhoto(i){
    console.log(i)
    const selected: number = i;
    this.navCtrl.push(BestPhotoPage, { "selected": selected});
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
