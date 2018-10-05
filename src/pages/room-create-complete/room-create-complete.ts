import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { CameraProvider } from '../../providers/camera/camera';
import { RoomCreatePage } from '../room-create/room-create';

@IonicPage()
@Component({
  selector: 'page-room-create-complete',
  templateUrl: 'room-create-complete.html',
})
export class RoomCreateCompletePage {

  image_local: any;
  validations_form: FormGroup;
  title: '';
  description: '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder, 
    public cam: CameraProvider, 
  ) {
  }

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomCreateCompletePage');
  }

  goBack() {
    this.navCtrl.pop();
  }
  next(){
    let _title = this.title;
    let _description = this.description;
    let _avatar = this.image_local;
    this.navCtrl.push(RoomCreatePage, {
      title: _title, description: _description, avatar :_avatar});
  }

  TakeaPicture() {
    this.cam.selectImage(1, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
      alert("picture saved")
    }, err => {
      console.log("error with select of picture")
      console.log("param not send")
    });
  }

  navToGallery() {
    this.cam.selectImage(0, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
      alert("picture saved")
    }, err => {
      console.log("error with select of picture")
      console.log("param not send")
    });
  }

  validation_messages = {    
    'title': [
      { type: 'required', message: 'The title is required.' }
    ],
    'description': [
      { type: 'required', message: 'The description is required.' }
    ]
  };
}
