import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, LoadingController, MenuController } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { Auth, User, Category } from "../../types";

import { DataProvider, RestProvider, SocketsProvider } from '../../providers';
import { ContestPage } from '../contest/contest';
import { WhatIsWatogPage } from '../what-is-watog/what-is-watog';
import { ChatRoomPage } from '../chat-room/chat-room';
import { AdModalPage } from '../ad-modal/ad-modal';
import { LearnPage } from '../learn/learn';
import { LivePage } from '../live/live';
import { SettingsPage } from '../settings/settings';

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

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
    public restProvider: RestProvider,
    private youtube: YoutubeVideoPlayer,
    private plt: Platform,
    private socketProvider: SocketsProvider,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    if (DataProvider.showAd) {
      DataProvider.showAd = false;
      //this.presentAdModal();
    }
    this.socketProvider.connectSocket();
    this.socketProvider.registerForChatService();
    this.socketProvider.Receive();
  }

  presentLiveModal() {
    // const liveModal = this.modalCtrl.create(LivePage);
    // liveModal.present();
    const loader = this.loadingCtrl.create({ content: "Connecting..." });
    loader.present();
    this.restProvider.getLiveYouTubeId().then(videoId => {
      loader.dismiss();
      if (this.plt.is('cordova')) {
        this.youtube.openVideo(videoId);
      } else {
        window.open('https://www.youtube.com/watch?v=' + videoId);
      }
    }).catch((err) => {
      window.alert(err);
    });
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
  goToSetting(){
    this.navCtrl.push(SettingsPage);
  }
  onSideMenu(){
    this.menuCtrl.open();
  }
}
