import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {DocumentViewer, DocumentViewerOptions} from "@ionic-native/document-viewer";
import {File} from "@ionic-native/file";

import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';

/* Providers */
import { DataProvider } from '../../providers/data/data';
import { VoteModalPage } from '../vote-modal/vote-modal';
import { ModalPrinciplesPage } from '../modal-principles/modal-principles';
import { ModalLogout } from '../modal-logout/modal-logout';
/**
 * Generated class for the ContestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest',
  templateUrl: 'contest.html',
})
export class ContestPage {
  public data: DataProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public dataProvider: DataProvider, private document: DocumentViewer, private file: File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestPage');
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

  goToParticipate(){
    //First show a modal
    this.navCtrl.push(ModalPrinciplesPage);
  }

  goToVote(){
    this.navCtrl.push(VoteModalPage);
  }

  showRules() {
    const options: DocumentViewerOptions = {
      title: 'WATOG Contest Rules',
      openWith: { enabled: true }
    }
    const filePath = this.file.applicationDirectory + 'www/assets/docs/rules.pdf'
    this.document.viewDocument(filePath, 'application/pdf', options);
  }

  logout(){
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
  }
}
