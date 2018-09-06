import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { ContestSubmitPage } from '../contest-submit/contest-submit';
import { ParticipatePage } from "../participate/participate"
import { LoginPage } from '../login/login';
import { DataProvider } from '../../providers/data/data';
import {DocumentViewer, DocumentViewerOptions} from "@ionic-native/document-viewer";
import {File} from "@ionic-native/file";
import {UploadWatogLogoPage} from "../upload-watog-logo/upload-watog-logo";

/**
 * Generated class for the BestPhotoWithTheWatogLogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-best-photo-with-the-watog-logo',
  templateUrl: 'best-photo-with-the-watog-logo.html',
})
export class BestPhotoWithTheWatogLogoPage {
  public passParam: any;
  public watog_logo_image: string = "assets/imgs/WATOG-quadri_logo_seul.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider , private document: DocumentViewer, private file: File) {
    this.passParam = this.navParams.data;
    if(this.passParam.image_url){
      this.watog_logo_image = this.passParam.image_url;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestPhotoWithTheWatogLogoPage');
  }

  uploadWatogLogo(){
    this.navCtrl.push(UploadWatogLogoPage, {from: "BestPhotoWithTheWatogLogoPage"});
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

  goToContestSubmit(){
    this.navCtrl.push(ContestSubmitPage, { id: this.passParam.id , from: this.passParam.from });
  }

  goBack(){
    this.navCtrl.push(ParticipatePage);
  }

  goNext(){
    var consent = <HTMLInputElement> document.getElementById("consentCertified");
    if(consent.checked == true){
      this.goToContestSubmit();
    } else {
      document.getElementById("certifyConsent").style.backgroundColor = "#e40046";
    }
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}
