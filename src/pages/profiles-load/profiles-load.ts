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
  public user: User

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public restProvider: RestProvider) {
    const params = this.navParams.data;
    if(params.from == 'randomUser'){
      this.user = params.user.User;
    } else if(params.from == 'contestUser'){
      this.user = params.user;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilesLoadPage');
    // Use default avatar
    if (!this.user.picture_profile) {
      this.user.picture_profile = 'assets/icon/Profil.png';
    }
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

