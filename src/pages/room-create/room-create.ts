import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Country } from "../../types";
import { countries } from '../../models/model';
import { ModalQualification } from '../modal-qualification/modal-qualification';

import { ChatRoomPage } from '../chat-room/chat-room';
import { ChatService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-room-create',
  templateUrl: 'room-create.html',
})
export class RoomCreatePage {
  
  validations_form: FormGroup;
  countries: Country[];
  country: Country[];
  job : any;  
  topics : any=[
    {id:1, name: "Classical Surgery"}, 
    {id:2, name: "Laparoscopy"}, 
    {id:3, name: "Robotic"}, 
    {id:4, name: "Obstetrics"}, 
    {id:5, name: "Neonats"}, 
    {id:6, name: "Fertility"}, 
    {id:7, name: "Ultrasound"}, 
    {id:8, name: "Fetal Medicine"}, 
    {id:9, name: "MRI"}, 
    {id:10, name: "Simulation"}];
  topic: any;
  promise: any;
  userList: Array<any> = [];
  _tempuserList: Array<any> = [];  
  roomMemberList: Array<any> = [];
  isMembers = false;
  search: '';

  avatar: any;
  title: '';
  description: '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder, 
    public modalCtrl: ModalController,
    public chatService: ChatService, 
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController) {

    this.title = navParams.get("title");
    this.description = navParams.get("description");
    this.avatar = navParams.get("avatar");

    this.countries = [
      new Country(countries[0].code, countries[0].name)
    ]
    for (var i = 1; i < countries.length; i++) {
      const County = new Country(countries[i].code, countries[i].name)
      this.countries.push(County);
    }
  }

  ionViewWillLoad(){
    let country = new FormControl('', Validators.required);
    let topic = new FormControl('', Validators.required);
    this.validations_form = this.formBuilder.group({
      country: country,
      topic : topic,
      search : [''],
      job: ['', Validators.compose([
        Validators.required
      ])]
    });
  }
  ionViewDidLoad() {
    // get User Data
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    this.chatService.getUserList()
    .then((res: any) => {
      for( var i = 0 ; i < res.length ; i++){
        let element = res[i];
        let _member = {};
        _member["index"] = i;
        _member["user_id"] = element.id;
        _member["avatar"] = element.picture_profile;
        _member["username"] = element.first_name+" "+element.last_name;
        _member["country"] = element.country;
        this.userList.push(_member);
        this._tempuserList.push(_member);
      }
        loader.dismiss();
    }).catch(err => {
      loader.dismiss();
      console.log(err)
    })
  }

  addMember(_contact){
    this.roomMemberList.push(_contact)
    this.roomMemberList.sort(function (a, b) {
      return a.index - b.index;
    });

    for(var i= 0 ; i < this.userList.length; i++){
      if(this.userList[i].index === _contact.index){
        this.userList.splice(i, 1)
      }
    }
    this.userList.sort(function (a, b) {
      return a.index - b.index;
    });
    
    if (this.roomMemberList.length > 0){
      this.isMembers = true
    }
  }

  removeMember(_member){
    this.userList.push(_member);
    this.userList.sort(function (a, b) {
      return a.index - b.index;
    });
    for(var i= 0 ; i < this.roomMemberList.length; i++){
      if(this.roomMemberList[i].index === _member.index){
        this.roomMemberList.splice(i, 1)
      }
    }
    this.roomMemberList.sort(function (a, b) {
      return a.index - b.index;
    });

    if (this.roomMemberList.length == 0){
      this.isMembers = false
    }
  }
  onSearch(){
    let searchTerm = this.search;
    this.userList = this._tempuserList.filter((item) => {
        return item.username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    }); 
  }

  /*Methods for the html dom modification */
  openQualificationModal() {
    let profileModal = this.modalCtrl.create(ModalQualification);
    profileModal.onDidDismiss(data => {
      this.job = data.other;
    });
    profileModal.present();    
  }

  goBack() {
    this.navCtrl.pop();
  }

  next(){
   
    let _memberList = [];
    this.roomMemberList.forEach(element => {
      _memberList.push(element.user_id)
    });
    let _countryName = "";
    for(var i = 0 ; i < this.country.length ; i++){
      if(i == 0 ){
        _countryName = this.country[i].name
      }
      else{
        _countryName += ", "+this.country[i].name
      }
    }
   
    let params = {};
    params["category_id"] = 1;
    params["title"] = this.title;
    params["description"] = this.description;
    params["countries"] = _countryName;
    params["topics"] = this.topic.name;
    params["jobs"] = this.job;
    
    params["members"] = _memberList;
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    
    if (this.avatar) {
      this.chatService.sendFile(this.avatar).then((data: any) => {
        let _url = data.url;
        params["avatar"] = _url;
        this.chatService.createRoom(params)
          .then((res: any) => {
              loader.dismiss();
              this.navCtrl.push(ChatRoomPage);
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
      this.chatService.createRoom(params)
      .then((res: any) => {
          console.log("response =>", res);
          loader.dismiss();
          this.navCtrl.push(ChatRoomPage);
      }).catch(err => {
        loader.dismiss();
        console.log(err)
      })  
    }   
    
  }

  validation_messages = {    
    'job': [
      { type: 'required', message: 'Job is required.' }
    ],
    'topic': [
      { type: 'required', message: 'Topic is required.' }
    ],
    'country': [
      { type: 'required', message: 'Country is required.' }
    ],
  };
}
