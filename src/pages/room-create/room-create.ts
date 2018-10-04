import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Country, Room, Member } from "../../types";
import { countries } from '../../models/model';
import { ModalQualification } from '../modal-qualification/modal-qualification';

import { ChatRoomPage } from '../chat-room/chat-room'
import { ChatService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-room-create',
  templateUrl: 'room-create.html',
})
export class RoomCreatePage {
  
  validations_form: FormGroup;
  countries: Country[];
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
  promise: any;
  userList: Array<any> = [];
  roomMemberList: Array<any> = [];
  isMembers = false;
  // search: '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder, 
    public modalCtrl: ModalController,
    public chatService: ChatService, 
    public loadingCtrl: LoadingController) {
    this.countries = [
      new Country(countries[0].code, countries[0].name)
    ]
    for (var i = 1; i < countries.length; i++) {
      const County = new Country(countries[i].code, countries[i].name)
      this.countries.push(County);
    }
  }

  ionViewWillLoad(){
    let country = new FormControl(this.countries[0], Validators.required);
    let topic = new FormControl(this.topics[0], Validators.required);
    this.validations_form = this.formBuilder.group({
      country: country,
      topic : topic,
      // search : [''],
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
      }
        loader.dismiss();
    }).catch(err => {
      loader.dismiss();
      console.log(err)
    })
  }
  addMember(_contact){
    this.roomMemberList.push(_contact);
    console.log("sdf", _contact)
    this.userList.splice(_contact.index, 1);
    console.log("ss", this.userList)
    if (this.roomMemberList.length > 0){
      this.isMembers = true
    }
  }
  removeMember(_member){
    this.userList.push(_member);
    this.roomMemberList.splice(_member.index, 1);
    if (this.roomMemberList.length == 0){
      this.isMembers = false
    }
  }
  onSearch(){
    // console.log(this.search)
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
    this.navCtrl.push(ChatRoomPage);
  }
  validation_messages = {    
    'job': [
      { type: 'required', message: 'Job is required.' }
    ],
  };
}
