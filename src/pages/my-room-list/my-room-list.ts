import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { RoomCreatePrePage } from '../room-create-pre/room-create-pre';
import { RoomCreateCompletePage } from '../room-create-complete/room-create-complete';
import { ChatPage } from '../chat/chat';
import { ChatRoomPage } from '../chat-room/chat-room';
import { EditChatRoomPage } from '../edit-chat-room/edit-chat-room';
import { ChatService } from '../../providers';
import { Socket } from 'ng-socket-io';

@IonicPage()
@Component({
  selector: 'page-my-room-list',
  templateUrl: 'my-room-list.html',
})

export class MyRoomListPage {
  parentSelector = null;
  lists: any = [];
  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController, 
    public navParams: NavParams,
    public chatService: ChatService, 
    private socket: Socket) {
    this.parentSelector = navParams.get("parentSelector");    
  }

  ionViewDidEnter() {
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    this.chatService.myRoomList()
    .then((res: any) => {
        console.log(res)
        this.lists = res;
        loader.dismiss();
    }).catch(err => {
      loader.dismiss();
      console.log(err)
    })
  }

  addRoom (){
    // this.parentSelector.push(RoomCreatePrePage);
    this.parentSelector.push(RoomCreateCompletePage);
  }
  goToChattingPage(){
    this.socket.connect();
  }
  
  editRoom(roomInfo){
    this.parentSelector.push(EditChatRoomPage, {roomInfo : roomInfo});
  }

  archiveRoom(roomInfo){
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    this.chatService.archiveRoom(roomInfo.id)
    .then((res: any) => {
        console.log(res)
        loader.dismiss();        
    }).catch(err => {
      loader.dismiss();
      console.log(err)
    })    
  }
}
