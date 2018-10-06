import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-room-info',
  templateUrl: 'room-info.html',
})
export class RoomInfoPage {

  roomData: any;
  userCount : any;
  admin : any;
  members : any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.roomData = navParams.get("roomData");
      this.admin = this.roomData.User;
      this.members = this.roomData.Members;
      this.userCount = this.members.length;      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomInfoPage');
  }

  goBack() {
    this.navCtrl.pop();
  }
  
}
