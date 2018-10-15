import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, LoadingController, MenuController, Events } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { Auth, User, Category } from "../../types";

import { DataProvider, RestProvider, SocketsProvider, ChatService } from '../../providers';
import { ContestPage } from '../contest/contest';
import { WhatIsWatogPage } from '../what-is-watog/what-is-watog';
import { ChatRoomPage } from '../chat-room/chat-room';
import { AdModalPage } from '../ad-modal/ad-modal';
import { LearnPage } from '../learn/learn';
import { LivePage } from '../live/live';
import { SettingsPage } from '../settings/settings';
import { Contact, Message, Room, Member } from '../../types';

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
    public chatService: ChatService,
    public events: Events,
    public loadingCtrl: LoadingController) {
    }

  ionViewDidLoad() {
    if (DataProvider.showAd) {
      DataProvider.showAd = false;
      //this.presentAdModal();
    }
    this.socketProvider.connectSocket();
    this.socketProvider.registerForChatService();
    this.socketProvider.Receive();

    var self = this;
    setInterval(function () {
      self.chatService.myRoomList()
      .then((res: any) => {
        let count_unreadmessage: any = 0;
        res.forEach(element => {
          if(element.unread_message_count > 0){
            count_unreadmessage += parseInt(element.unread_message_count)
          }
        });
        self.events.publish('notification:unread', count_unreadmessage);          
      }).catch(err => {
        console.log("err", err)
      })
    }, 30000);
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
