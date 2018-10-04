import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-room-info',
  templateUrl: 'room-info.html',
})
export class RoomInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomInfoPage');
  }

  goBack() {
    this.navCtrl.pop();
  }
  
}
