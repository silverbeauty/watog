import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Country } from "../../types";
import { countries } from '../../models/model';
import { ModalQualification } from '../modal-qualification/modal-qualification';

import {ChatRoomPage} from '../chat-room/chat-room'

@IonicPage()
@Component({
  selector: 'page-room-create',
  templateUrl: 'room-create.html',
})
export class RoomCreatePage {
  
  validations_form: FormGroup;
  public countries: Country[];
  public job : any;  
  public topics : any=[{id:1, name: "Classical Surgery"}, {id:2, name: "Laparoscopy"}, {id:3, name: "Robotic"}];  
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public modalCtrl: ModalController) {
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
      job: ['']
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomCreatePage');
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

  create(){
    this.navCtrl.push(ChatRoomPage);
  }
}
