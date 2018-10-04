import { Component, ElementRef, ViewChild } from '@angular/core';
import { Events, Content, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ChatService} from "../../providers/chat-service/chat-service";
import { Contact, Message } from '../../types';
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
  user: Contact;
  toUser: Contact;
  editorMsg = '';
  showEmojiPicker = false;
  isSearch= false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private chatService: ChatService,
    private events: Events,
    public modalCtrl: ModalController) {
    
      // Get the navParams toUserId parameter
    this.toUser = {
      id: 210000198410281948,
      name: "BenJamin",
      avatar : ""
    };
    // Get mock user information
    this.chatService.getUserInfo()
    .then((res) => {
      this.user = res;      
    });    
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    
    //get message list
  
    // this.getMsg();

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
      console.log("recived")
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
   * @name getMsg
   * @returns {Promise<Message[]>}
   */
  getMsg() {    
    // Get mock message list
    return this.chatService
    .getMsgList()
    .subscribe(res => {
      this.msgList = res;
      this.scrollToBottom();
    });
  }

  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    const id = Date.now().toString();
    let newMsg: Message = {
      messageId: Date.now().toString(),
      userId: this.user.id,
      userName: this.user.name,
      userAvatar: this.user.avatar,
      toUserId: this.toUser.id,
      time: Date.now(),
      message: this.editorMsg,
      status: 'pending'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }

    this.chatService.sendMsg(newMsg)
    .then(() => {
      let index = this.getMsgIndexById(id);
      if (index !== -1) {
        this.msgList[index].status = 'success';
      }
    })
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: Message) {
    const userId = this.user.id,
      toUserId = this.toUser.id;
    // Verify user relationships
    if (msg.userId === userId && msg.toUserId === toUserId) {
      this.msgList.push(msg);
    } else if (msg.toUserId === userId && msg.userId === toUserId) {
      this.msgList.push(msg);
    }
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  scrollToBottom() {
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
    console.log('ionViewDidLoad ChatPage');
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

  goBack() {
    this.navCtrl.pop();
  }

  // right side menu funtion
  archiveMessage(){

  }
  
  roomInfo(){
    this.navCtrl.push(RoomInfoPage);
  }

  report(){
    let reportModal = this.modalCtrl.create(ReportModalPage);
    reportModal.onDidDismiss(data => {
      console.log("report modal=>", data)
    });
    reportModal.present();    
  }
}
