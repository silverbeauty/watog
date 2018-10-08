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
  memberLimit : any='';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.roomData = navParams.get("roomData");
      console.log(this.roomData);
      this.admin = this.roomData.User;
      this.roomData.Members.forEach(element => {
        if (this.admin.id != element.User.id){
          this.members.push(element);
        }
      });
      this.userCount = this.roomData.Members.length;      
      if(this.roomData.member_count_limit)
        this.memberLimit = this.roomData.member_count_limit
      else
        this.memberLimit = 'unlimited'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomInfoPage');
  }

  goBack() {
    this.navCtrl.pop();
  }
  
}
