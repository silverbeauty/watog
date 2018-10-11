import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

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
    public platform: Platform,
    public keyboard: Keyboard
  ) {
  }

  ionViewWillLoad() {
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

  ionViewDidEnter(){
    let platform = this.platform
    let keyboard = this.keyboard
    platform.ready().then(() => {
      if (platform.is('ios')) {
        
        let appEl = <HTMLElement> (document.getElementById("profileboard").getElementsByClassName("scroll-content")[0]);
        keyboard.disableScroll(true);

        window.addEventListener('native.keyboardshow', (e) => {
          keyboard.disableScroll(true);
          
          appEl.style.bottom = (<any>e).keyboardHeight + 'px'
        });

        window.addEventListener('native.keyboardhide', () => {
          appEl.style.bottom = '0px';
        });
      }
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
  next() {
    let _title = this.title;
    let _description = this.description;
    let _avatar = this.image_local;
    this.navCtrl.push(RoomCreatePage, {
      title: _title, description: _description, avatar: _avatar
    });
  }

  TakeaPicture() {
    this.cam.selectImage(1, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
    }, err => {
      console.log("error with select of picture")
      console.log("param not send")
    });
  }

  navToGallery() {
    this.cam.selectImage(0, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
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
