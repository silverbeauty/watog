import { Component, ElementRef, ViewChild } from '@angular/core';
import { Events, Content, IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ChatService, SocketsProvider} from "../../providers/";
import { Contact, Message, Auth } from '../../types';
import { ReportModalPage } from '../report-modal/report-modal';
import { RoomInfoPage } from '../room-info/room-info';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  
  msgList: Message[] = [];
  sender : Contact;
  toUser: Contact;
  editorMsg = '';
  showEmojiPicker = false;
  isSearch= false;
  roomData: any= [];
  room_id: '';
  totalUsers=0;
  promise: any;
  _socket: any;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      private chatService: ChatService,
      private events: Events,
      public loadingCtrl: LoadingController,
      private socketProvider: SocketsProvider,
      public modalCtrl: ModalController
    ) {    
      const res = [ window.localStorage.getItem('authorization'),  window.localStorage.getItem('user')]
      
      const auth = JSON.parse(res[1]);
      
      this.sender={
        id : auth.id,
        name : auth.first_name+" "+auth.last_name,
        avatar : auth.picture_profile
      }

      this.socketProvider.connectSocket();
      this.socketProvider.registerForChatService();

      this.room_id = navParams.get("roomInfo").id;
      
      this.socketProvider.Receive();
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    })
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }
  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    let _newMsg: Message = {
      messageId: Date.now().toString(),
      userId: this.sender.id,
      userName: this.sender.name,
      userAvatar: this.sender.avatar,
      time: Date.now(),
      message: this.editorMsg
    };

    let newMsg = {
      text : this.editorMsg,
      room_id : this.roomData.id
    }

    this.pushNewMsg(_newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }

    this.socketProvider.sendMsg(newMsg);
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: any) {
    this.msgList.push(msg);
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  scrollToBottom() {
    console.log("scrollTiem")
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

  ionViewDidLoad() {
    
    var d = new Date();
    let _endDate = new Date(d.getFullYear(), d.getMonth(), d.getDay(),d.getHours(), d.getMinutes(), d.getSeconds()).toISOString();    
    let _startdate = new Date(d.getFullYear(), d.getMonth(), d.getDay()-2,d.getHours(), d.getMinutes(), d.getSeconds()).toISOString();
    let _param = "from="+_startdate+"&to="+_endDate;
      
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();

    this.promise = Promise.all([this.chatService.getRoomInfo(this.room_id), this.chatService.getMsgList(this.room_id, _param)]);
    this.promise.then(data =>{
      console.log("chat ===> ", data)
      this.roomData = data[0];
      console.log(this.roomData);
      this.msgList = data[1];
      this.totalUsers = this.roomData.Members.length;
      loader.dismiss();
      this.scrollToBottom();
    }).catch(err => {
      loader.dismiss();
      console.log("err", err)
    })
  }
  // toolbar funtion
  attachFile(){

  }
  addUser(){

  }
  searchMessage(){
    this.isSearch = true;
  }
  closeSearchBar(){
    this.isSearch = false;
  }

  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');
  //   infiniteScroll.complete();
  // }

  goBack() {
    this.navCtrl.pop();
  }

  // right side menu funtion
  archiveMessage(){

  }
  
  roomInfo(){
    this.navCtrl.push(RoomInfoPage, {roomData : this.roomData});
  }

  report(){
    let reportModal = this.modalCtrl.create(ReportModalPage);
    reportModal.onDidDismiss(data => {
      console.log("report modal=>", data)
    });
    reportModal.present();    
  }
}
