import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DashboardPage} from "../dashboard/dashboard";
import {ProfilePage} from "../profile/profile";
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
  public selected: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
    this.auth = DataProvider.auth;
    this.selected = this.navParams.data.selected;
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


  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToProfilePage(){
    this.navCtrl.push(ProfilePage);
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
