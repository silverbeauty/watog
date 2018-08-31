import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { CameraProvider } from '../../providers/camera/camera';
import {resFile} from "../../types";
import {  RestProvider } from '../../providers';


/**
 * Generated class for the UploadProfilePhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-profile-photo',
  templateUrl: 'upload-profile-photo.html',
})
export class UploadProfilePhotoPage {
  public image_base64: any;
  public image_choose: any;
  public image_url: any;
  profile_selected: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cam: CameraProvider, public restProvider: RestProvider) {
    this.image_base64 = "assets/imgs/appareil.png";
    this.image_choose = "assets/imgs/on_your_computer.png";
    this.image_url="assets/imgs/rio.jpg";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadProfilePhotoPage');
  }

  gotToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url, profile_selected: this.profile_selected });
  }

  TakeaPicture(){
    this.cam.selectImage(1, 0).then(resp => {
      this.image_url = "data:image/jpeg;base64," + resp;
      this.restProvider.sendFile(this.image_url).then((res_file: resFile) => {
        this.image_url = res_file.url;
        this.profile_selected = true;
        this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url,  profile_selected: this.profile_selected });
      }).catch((error) => {
        alert("Send file to server error!");
      })
    }, err => {
    });
  }

  navToGallery() {
    this.cam.selectImage(0, 0).then(resp => {
      this.image_url = "data:image/jpeg;base64," + resp;
      this.restProvider.sendFile(this.image_url).then((res_file: resFile) => {
        this.image_url = res_file.url;
        this.profile_selected = true;
        this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url,  profile_selected: this.profile_selected });
      }).catch((error) => {
        alert("Send file to server error!");
      })
    }, err => {
    });
  }
}
