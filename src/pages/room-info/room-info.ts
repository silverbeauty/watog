import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ChatService } from '../../providers';
import { Events } from 'ionic-angular';
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
  isCreator : boolean = false;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, 
    public chatService: ChatService,  
    public events: Events,
    public navParams: NavParams) {
      const res = [ window.localStorage.getItem('authorization'),  window.localStorage.getItem('user')]
      
      const auth = JSON.parse(res[1]);

      this.roomData = navParams.get("roomData");

      if(auth.id ==  this.roomData.User.id){
        this.isCreator = true;
      }

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
  deleteMember(contact){

    if( !this.isCreator ){
      let _alert = this.alertCtrl.create({
        title: '',
        subTitle: 'The room creator can only delete the member',
        buttons: ['OK']
      });
      _alert.present();
      return;
    }

    const room_id = this.roomData.id;
    const user_id = contact.user_id;
    let params = {};
    params["user_id"] = user_id;

    console.log(" param = > ", params)
    let alert = this.alertCtrl.create({
      title: '',
      message: 'Do you want to delete this member?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            const loader = this.loadingCtrl.create({ content: "Please wait..." });
            loader.present();
            this.chatService.removeMember(room_id, params).then((res: any) => {
              this.events.publish('remove:member', contact);
              loader.dismiss();
              this.navCtrl.pop();
            }).catch(err => {
              loader.dismiss();
              console.log(err)
            })
          }
        }
      ]
    });
    alert.present();
  }
}
