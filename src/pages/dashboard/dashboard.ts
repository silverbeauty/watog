import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Auth, User, Category } from "../../types";

import { DataProvider, RestProvider } from '../../providers';
import { ContestPage } from '../contest/contest';
import { WhatIsWatogPage } from '../what-is-watog/what-is-watog';
import { ChatRoomPage } from '../chat-room/chat-room';
import { AdModalPage } from '../ad-modal/ad-modal';
import { LearnPage } from '../learn/learn';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public dataProvider: DataProvider, public restProvider: RestProvider) {}

  ionViewDidLoad() {
    if (DataProvider.showAd) {
      DataProvider.showAd = false;
      //this.presentAdModal();
    }
  }

  presentAdModal() {
    let profileModal = this.modalCtrl.create(AdModalPage, {});
    profileModal.present();
  }
  
  goToWhatIsWatog(){
    this.navCtrl.push(WhatIsWatogPage);
  }

  goToContest(){
    this.navCtrl.push(ContestPage);
  }
  goToLearn(){
    this.navCtrl.push(LearnPage);
  }
  goToChatRoom(){
    this.navCtrl.push(ChatRoomPage);
  }
  goToLive(){
    this.navCtrl.push(WhatIsWatogPage);
  }
  goToSetting(){
    this.navCtrl.push(WhatIsWatogPage);
  }
}
