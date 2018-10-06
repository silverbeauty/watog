import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ChatService } from '../../providers';
import { CameraProvider } from '../../providers/camera/camera';
import { ChatRoomPage } from '../chat-room/chat-room';
@IonicPage()
@Component({
  selector: 'page-edit-chat-room',
  templateUrl: 'edit-chat-room.html',
})
export class EditChatRoomPage {
  image_local: any;
  title: '';
  description: '';
  avatar: '';
  roomInfo: any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public chatService: ChatService, 
    public loadingCtrl: LoadingController, 
    public cam: CameraProvider, ) {
      this.roomInfo = navParams.get("roomInfo");
      this.title = this.roomInfo.title
      this.description = this.roomInfo.description;
      this.avatar = this.roomInfo.avatar;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditChatRoomPage');
  }

  goBack() {
    this.navCtrl.pop();
  }
  update(){
    
    let params = {};
    params["title"] = this.title;
    params["description"] = this.description;
    params["avatar"] = this.image_local;

    console.log("param => ", params);
    
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    this.chatService.editRoom(params, this.roomInfo.id)
    .then((res: any) => {
        console.log("response =>", res);
        loader.dismiss();
        this.navCtrl.push(ChatRoomPage);
    }).catch(err => {
      loader.dismiss();
      console.log(err)
    })
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
