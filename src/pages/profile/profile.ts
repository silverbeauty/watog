import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { SettingsPage } from '../settings/settings';
import { DataProvider } from '../../providers';
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

  public best_rank: string = "2nd";
  public votes: number = 335;
  public new_votes: number = 128;

  constructor(public navCtrl: NavController, public navParams: NavParams, public profil: DataProvider) {

    this.promise = Promise.all([this.profil.get()]);
    this.promise.then(res => {
      return JSON.parse(res);
    })
    .then(data => {
      this.name = data.first_name;
      this.lastname = data.last_name;
      this.proffesion = data.hospital;
      this.location = data.country;
      this.fullname = this.name + ' ' + this.lastname;
      this.photo_profil = data.picture_profile;
      document.getElementById('profile-picture').setAttribute("style", `background-image: url(${ this.photo_profil });`);
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(`background-image: url(${ this.photo_profil });`)
    //document.getElementById('profile-picture').setAttribute("style", `background-image: url(${ this.photo_profil });`);
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
