import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RoomCreatePrePage } from '../room-create-pre/room-create-pre';
import { RoomCreatePage } from '../room-create/room-create';

@IonicPage()
@Component({
  selector: 'page-my-room-list',
  templateUrl: 'my-room-list.html',
})
export class MyRoomListPage {
  parentSelector = null;
  lists: any = [{img:"./assets/imgs/logo.png", title: "Room1"}, {img:"./assets/imgs/logo.png", title: "Room2"}, {img:"./assets/imgs/logo.png", title: "Room2"}, {img:"./assets/imgs/logo.png", title: "Room2"}];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parentSelector = navParams.get("parentSelector");    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRoomListPage');
  }

  addRoom (){
    // this.parentSelector.push(RoomCreatePrePage);
    this.parentSelector.push(RoomCreatePage);
  }
}
