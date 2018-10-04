import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DataProvider, RestProvider } from '../../providers';
import { CameraProvider } from '../../providers/camera/camera';

@IonicPage()
@Component({
  selector: 'page-edit-chat-room',
  templateUrl: 'edit-chat-room.html',
})
export class EditChatRoomPage {
  public image_url: any;
  public image_local: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public restProvider: RestProvider, 
    public dataProvider: DataProvider, 
    public cam: CameraProvider, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditChatRoomPage');
  }

  goBack() {
    this.navCtrl.pop();
  }
  update(){
    this.navCtrl.pop();
  }

  TakeaPicture() {
    this.cam.selectImage(1, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
      alert("picture saved")
    }, err => {
      console.log("error with select of picture")
      console.log("param not send")
    });
  }

  navToGallery() {
    this.cam.selectImage(0, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
      alert("picture saved")
    }, err => {
      console.log("error with select of picture")
      console.log("param not send")
    });
  }
}
