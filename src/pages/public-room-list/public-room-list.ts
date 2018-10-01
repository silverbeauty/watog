import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PublicRoomListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-public-room-list',
  templateUrl: 'public-room-list.html',
})
export class PublicRoomListPage {
  lists: any = [{img:"./assets/imgs/logo.png", title: "Room1"}, {img:"./assets/imgs/logo.png", title: "Room2"}, {img:"./assets/imgs/logo.png", title: "Room2"}, {img:"./assets/imgs/logo.png", title: "Room2"}];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicRoomListPage');
  }

}
