import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, } from 'ionic-angular';
import { ChatService } from '../../providers';
/**
 * Generated class for the ContactListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactListPage {
  roomData: any= [];
  search: '';
  userList: Array<any> = [];
  _tempuserList: Array<any> = []; 

  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController, 
    public chatService: ChatService, 
    public alertCtrl: AlertController,
    public navParams: NavParams) {
      this.roomData = navParams.get("roomData");
  }

  ionViewDidLoad() {
    // get User Data
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    this.chatService.getUserList()
    .then((res: any) => {
      for( var i = 0 ; i < res.length ; i++){
        let element = res[i];
        let isMember = false ;
        this.roomData.Members.forEach(_element => {
          if (element.id == _element.User.id){
            isMember = true
          }
        });

        if(!isMember){
          let _member = {};
          _member["index"] = i;
          _member["user_id"] = element.id;
          _member["avatar"] = element.picture_profile;
          _member["username"] = element.first_name+" "+element.last_name;
          _member["country"] = element.country;
          this.userList.push(_member);
          this._tempuserList.push(_member);    
        }
      }
      
      loader.dismiss();
    }).catch(err => {
      loader.dismiss();
      console.log(err)
    })
  }

  onSearch(){
    let searchTerm = this.search;
    this.userList = this._tempuserList.filter((item) => {
        return item.username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    }); 
  }
  
  goBack() {
    this.navCtrl.pop();
  }

  addMember(_contact){
    const room_id = this.roomData.id;
    const user_id = _contact.user_id;
    let params = {};
    params["user_id"] = user_id;

    console.log(" param = > ", params)
    let alert = this.alertCtrl.create({
      title: '',
      message: 'Do you want to add this member?',
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
            this.chatService.addMember(room_id, params).then((res: any) => {
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
