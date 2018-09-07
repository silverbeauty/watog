import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfilesLoadPage} from "../profiles-load/profiles-load";
import {SettingsPage} from "../settings/settings";
import {DashboardPage} from "../dashboard/dashboard";
import {LoginPage} from "../login/login";
import {DataProvider} from "../../providers/data/data";
import {ProfilePage} from "../profile/profile";

/**
 * Generated class for the ContestSearchResultKeywordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest-search-result-keyword',
  templateUrl: 'contest-search-result-keyword.html',
})
export class ContestSearchResultKeywordPage {

  public keywords: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
    const Keywords = this.navParams.data;
    this.keywords = Keywords.keyword;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestSearchResultUsersPage');
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

  public goToSearch(post){
    this.navCtrl.push(ProfilesLoadPage, {post: post, from: 'contestUser'});
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}
