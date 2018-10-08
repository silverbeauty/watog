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
  avatar: any;
  title: '';
  description: '';
  roomInfo: any;
  memberLimit: '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public chatService: ChatService, 
    public loadingCtrl: LoadingController, 
    public cam: CameraProvider, ) {
      this.roomInfo = navParams.get("roomInfo");
      this.title = this.roomInfo.title
      this.description = this.roomInfo.description;
      this.avatar = this.roomInfo.avatar;
      if(this.roomInfo.member_count_limit)
        this.memberLimit = this.roomInfo.member_count_limit;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditChatRoomPage');
  }

  goBack() {
    this.navCtrl.pop();
  }
  
  update(){
    let room_id = this.roomInfo.id;
    let params = {};
    params["title"] = this.title;
    params["description"] = this.description;
    if(this.memberLimit)
      params["member_count_limit"] = parseInt(this.memberLimit);

    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();

    if (this.avatar) {
      var self = this;
      this.chatService.sendFile(this.avatar).then((data: any) => {
        let _url = data.url;
        params["avatar"] = _url;
        self.chatService.editRoom(params, room_id)
          .then((res: any) => {
              loader.dismiss();
              self.navCtrl.pop();
          }).catch(err => {
            loader.dismiss();
            console.log(err)
          })

      }).catch((error) => {
        alert("server error!")
      })
    }
    else {     
      params["avatar"] = this.avatar;
      this.chatService.editRoom(params, room_id)
        .then((res: any) => {
            console.log("response =>", res);
            loader.dismiss();
            this.navCtrl.pop();
        }).catch(err => {
          loader.dismiss();
          console.log(err)
        })
    }  
  }

  TakeaPicture() {
    this.cam.selectImage(1, 0).then(resp => {
      this.avatar = "data:image/jpeg;base64," + resp;
    }, err => {
      console.log("error with select of picture")
      console.log("param not send")
    });
  }

  navToGallery() {
    this.cam.selectImage(0, 0).then(resp => {
      this.avatar = "data:image/jpeg;base64," + resp;
    }, err => {
      console.log("error with select of picture")
      console.log("param not send")
    });
  }
}
