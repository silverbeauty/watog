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
  members : any=[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.roomData = navParams.get("roomData");
      this.admin = this.roomData.User;
      this.roomData.Members.forEach(element => {
        if (this.admin.id != element.User.id){
          this.members.push(element);
        }
      });
      this.userCount = this.roomData.Members.length;      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomInfoPage');
  }

  goBack() {
    this.navCtrl.pop();
  }
  
}
