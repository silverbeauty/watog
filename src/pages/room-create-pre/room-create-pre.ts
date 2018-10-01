import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RoomCreatePage} from '../room-create/room-create'

@IonicPage()
@Component({
  selector: 'page-room-create-pre',
  templateUrl: 'room-create-pre.html',
})
export class RoomCreatePrePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomCreatePrePage');
  }
  goBack() {
    this.navCtrl.pop();
  }
  goNext(){
    this.navCtrl.push(RoomCreatePage);
  }
}
