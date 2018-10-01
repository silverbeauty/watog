import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {MyRoomListPage} from '../my-room-list/my-room-list'
import {PublicRoomListPage} from '../public-room-list/public-room-list'

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  @ViewChild("tabBar") tabRef: any;
  myroomTab: any;
  publicTab: any;
  tabParams : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabParams = {parentSelector : this.navCtrl};
    this.myroomTab = MyRoomListPage;
    this.publicTab = PublicRoomListPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatRoomPage');
  }

  goBack() {
    this.navCtrl.pop();
  }
}