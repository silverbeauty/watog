import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DashboardPage} from "../dashboard/dashboard";
import {ProfilesLoadPage} from "../profiles-load/profiles-load";
import {SettingsPage} from "../settings/settings";
import {LoginPage} from "../login/login";

import { DataProvider } from '../../providers/data/data';
import { RestProvider } from '../../providers/rest/rest';
import { User, Auth } from '../../types';


/**
 * Generated class for the BestPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-best-photo',
  templateUrl: 'best-photo.html',
})
export class BestPhotoPage {
  public auth: Auth
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
    this.auth = DataProvider.auth
    console.log(this.auth)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestPhotoPage');
    this.auth = DataProvider.auth;
    if (!this.auth.picture_profile) {
      this.dataProvider.getProfile().then( (auth: Auth) => {
        this.auth = auth;
        if (!this.auth.picture_profile) {
          this.auth.picture_profile = 'assets/icon/Profil.png';
        }
      }).catch(err => {
        console.error(err)
      })
    }
    // Load profile by API
  }
  goToSearch(user){
    console.log(user)
    this.navCtrl.push(ProfilesLoadPage , {user: user, from: 'randomUser'});
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

  goBack() {
    this.navCtrl.pop();
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }
}
