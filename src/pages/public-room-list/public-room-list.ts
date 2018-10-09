import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';

import { ChatPage } from '../chat/chat';
import { RoomCreateCompletePage } from '../room-create-complete/room-create-complete';
import { ChatService } from '../../providers';
/**
 * Generated class for the PublicRoomListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-public-room-list',
  templateUrl: 'public-room-list.html',
})
export class PublicRoomListPage {

  public lists: any = [];
  public _tempLists: any = [];
  public search: '';
  public isSearch = false;
  public parentSelector = null;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private events: Events,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.parentSelector = this.navParams.get('parentSelector');
    const loader = this.loadingCtrl.create({ content: 'Please wait...' });
    loader.present();
    this.chatService.getRoomsList()
      .then((res: any) => {
        console.log(res);
        this.lists = res;
        this._tempLists = res;
        loader.dismiss();
      }).catch(err => {
        loader.dismiss();
        console.log("err", err)
      })
  }

  ionViewDidLoad() {
    console.log('public room');
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
    console.log('addroom');
    this.parentSelector.push(RoomCreateCompletePage);

  }

  goToChattingPage(roomInfo) {
    console.log('goto chatting', roomInfo);
    this.parentSelector.push(ChatPage, { roomInfo: roomInfo });
  }

}
