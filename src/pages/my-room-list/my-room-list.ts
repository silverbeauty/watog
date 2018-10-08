import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';

import { RoomCreatePrePage } from '../room-create-pre/room-create-pre';
import { RoomCreateCompletePage } from '../room-create-complete/room-create-complete';
import { ChatPage } from '../chat/chat';
import { ChatRoomPage } from '../chat-room/chat-room';
import { EditChatRoomPage } from '../edit-chat-room/edit-chat-room';
import { ChatService } from '../../providers';

import { Message, Room, Member } from '../../types';

@IonicPage()
@Component({
  selector: 'page-my-room-list',
  templateUrl: 'my-room-list.html',
})

export class MyRoomListPage {
  parentSelector = null;
  lists: any = [];
  _tempLists : any=[];
  search: '';
  isSearch= false;

  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController, 
    public navParams: NavParams,
    public events: Events,
    public chatService: ChatService) {
    this.parentSelector = navParams.get("parentSelector");    
  }

  ionViewDidEnter() {
    var self = this;
    this.events.subscribe('main-chat-dashboard', () => {
      const loader = self.loadingCtrl.create({ content: "Please wait..." });
      loader.present();
      self.chatService.myRoomList()
      .then((res: any) => {
          self.lists = res;
          self._tempLists = res;
          loader.dismiss();
      }).catch(err => {
        loader.dismiss();
        console.log("err", err)
      })  
    })
  }
  onSearch(){
    let searchTerm = this.search;
    this.lists = this._tempLists.filter((item) => {
        return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    }); 
  }

  searchRoom(){
    this.isSearch = true;
  }
  closeSearchBar(){
    this.isSearch = false;
  }

  addRoom (){
    // this.parentSelector.push(RoomCreatePrePage);
    this.parentSelector.push(RoomCreateCompletePage);
  }
  goToChattingPage(roomInfo){
    // this.socket.connect();
    console.log(roomInfo)
    this.parentSelector.push(ChatPage, {roomInfo : roomInfo});
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
