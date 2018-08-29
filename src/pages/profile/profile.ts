import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { SettingsPage } from '../settings/settings';
import { DataProvider, RestProvider } from '../../providers';
import { User, Auth } from '../../types';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public promise : any;

  public name: string;
  public lastname: string;
  public proffesion: string;
  public location: string;
  public fullname: string;
  public photo_profil: string = "../../assets/imgs/rio.jpg";
  public userId: number;
  public vote: any = {
    commend: true
  }

  public me: any;
  public best_rank: string = "2nd";
  public votes: number = 335;
  public new_votes: number = 128;

  constructor(public navCtrl: NavController, public navParams: NavParams, public profil: DataProvider, public restProvider: RestProvider) {
    this.promise = Promise.all([this.profil.get()]);
    this.promise.then(res => {
      return JSON.parse(res);
    })
    .catch(err => {
      console.log('Another codova err')
    })

    this.promise.then(data => {
      console.log(JSON.stringify(data))
      this.userId = data.id;
      this.name = data.first_name;
      this.lastname = data.last_name;
      this.proffesion = data.hospital;
      this.location = data.country;
      this.fullname = this.name + ' ' + this.lastname;
      this.photo_profil = data.picture_profile;
      document.getElementById('profile-picture').setAttribute("style", `background-image: url(${ this.photo_profil });`);

      const myProfil = "?user_id=" + this.userId;

      this.restProvider.getAllPost(myProfil).then(data => {
        console.log("getpost", data)
        this.me = data;
      })
      .catch(err => {
        console.log('Is just cordova')
      })
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(`background-image: url(${ this.photo_profil });`)
    //document.getElementById('profile-picture').setAttribute("style", `background-image: url(${ this.photo_profil });`);
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
      this.navCtrl.push(ProfilePage)
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
    this.profil.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}
