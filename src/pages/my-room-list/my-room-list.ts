import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';
import * as _ from 'lodash';

import { RoomCreatePrePage } from '../room-create-pre/room-create-pre';
import { RoomCreateCompletePage } from '../room-create-complete/room-create-complete';
import { ChatPage } from '../chat/chat';
import { ChatRoomPage } from '../chat-room/chat-room';
import { EditChatRoomPage } from '../edit-chat-room/edit-chat-room';
import { ChatService, SocketsProvider } from '../../providers';

import { Message, Room, Member } from '../../types';

@IonicPage()
@Component({
  selector: 'page-my-room-list',
  templateUrl: 'my-room-list.html',
})

export class MyRoomListPage {
  parentSelector = null;
  lists: any = [];
  _tempLists: any = [];
  search: '';
  isSearch = false;
  auth: any;
  isFirstLoad = true;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public events: Events,
    public chatService: ChatService,
    public alertCtrl: AlertController) {

    this.parentSelector = navParams.get("parentSelector");
    const res = [window.localStorage.getItem('authorization'), window.localStorage.getItem('user')]

    this.auth = JSON.parse(res[1]);
  }

  ionViewDidEnter() {
    const isFirstLoad = this.isFirstLoad;
    this.isFirstLoad = false;
    let loader;
    if (isFirstLoad) {
      loader = this.loadingCtrl.create({ content: "Please wait..." });
      loader.present();
    }

    this.events.subscribe('main-chat-dashboard', () => {
      this.chatService.myRoomList()
        .then((res: any) => {
          // let temp: any = [];
          // temp = res.filter((item) => {
          //   if (!item.archived)
          //     return item;
          // });
          // res = temp;
          res = _.orderBy(res, ['unread_message_count'], ['desc']);
          this.lists = res;
          this._tempLists = res;
          if (isFirstLoad) {
            loader.dismiss();
          }
        }).catch(err => {
          if (isFirstLoad) {
            loader.dismiss();
          }
          console.log("err", err)
        })
    })

    this.events.subscribe('chat:received', msg => {
      this.lists.map(list => {
        if (list.id === msg.room_id) {
          list.unread_message_count++;
        }
      })
      this.lists = _.orderBy(this.lists, ['unread_message_count'], ['desc']);
    })
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  onSearch() {
    let searchTerm = this.search;
    this.lists = this._tempLists.filter((item) => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  searchRoom() {
    this.isSearch = true;
  }

  closeSearchBar() {
    this.isSearch = false;
  }

  addRoom() {
    // this.parentSelector.push(RoomCreatePrePage);
    this.parentSelector.push(RoomCreateCompletePage);
  }

  goToChattingPage(roomInfo) {
    // this.socket.connect();
    console.log(roomInfo)
    this.parentSelector.push(ChatPage, { roomInfo: roomInfo });
  }

  editRoom(roomInfo) {
    if (this.auth.id == roomInfo.User.id) {
      this.parentSelector.push(EditChatRoomPage, { roomInfo: roomInfo });
    }
    else {
      let _alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Only the room creator can edit / delete the room',
        buttons: ['OK']
      });
      _alert.present();
      return;
    }

  }

  archiveRoom(roomInfo) {
    if (this.auth.id == roomInfo.User.id) {
      const loader = this.loadingCtrl.create({ content: "Please wait..." });
      loader.present();
      this.chatService.archiveRoom(roomInfo.id)
        .then((temp: any) => {
          console.log(temp)
          // let temp: any = [];
          // temp = this.lists.filter((item) => {
          //   if (item.id != res.id)
          //     return item;
          // });
          this.lists = temp;
          this._tempLists = temp;
          loader.dismiss();
        }).catch(err => {
          loader.dismiss();
          console.log(err)
        })
    }
    else {
      let _alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Only the room creator can edit / delete the room',
        buttons: ['OK']
      });
      _alert.present();
      return;
    }

  }
}
