import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { SettingsPage } from '../settings/settings';
import { DataProvider, RestProvider } from '../../providers';
import { User, Auth } from '../../types';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-profiles-load',
  templateUrl: 'profiles-load.html',
})
export class ProfilesLoadPage {
  public userP : any;

  public name: string;
  public lastname: string;
  public proffesion: string;
  public location: string;
  public fullname: string;
  public photo_profil: string;
  public userId: number;
  public vote: any = {
    commend: true
  }

  public me: any;
  public best_rank: string = "2nd";
  public votes: number = 335;
  public new_votes: number = 128;

  constructor(public navCtrl: NavController, public navParams: NavParams, public profil: DataProvider, public restProvider: RestProvider) {
    const params = this.navParams.data;
    if(params.from == 'randomUser'){
      this.userP = params.user.User;
      console.log(this.userP)
    }
    else if(params.from == 'contestUser'){
      this.userP = params.user;
      console.log(this.userP)
    }

  }


  ionViewDidLoad() {

    this.userId = this.userP.id;
    this.name = this.userP.first_name;
    this.lastname = this.userP.last_name;
    this.proffesion = this.userP.hospital;
    this.location = this.userP.country;
    this.fullname = this.name + ' ' + this.lastname;
    this.photo_profil = this.userP.picture_profile;
    //document.getElementById('profile-picture').setAttribute("style", `background-image: url(${ this.photo_profil });`);

    const myProfil = "?user_id=" + this.userId;

    this.restProvider.getAllPost(myProfil).then(data => {
     console.log("getpost", data)
     this.me = data;
    })
    .catch(err => {
     console.log('Is just cordova')
   })
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
    this.restProvider.Voted(this.vote, makeVote).then(userP => {
      this.navCtrl.push(ProfilesLoadPage)
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
