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
  public image_local: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cam: CameraProvider, public restProvider: RestProvider) {
    this.image_base64 = "assets/imgs/appareil.png";
    this.image_choose = "assets/imgs/on_your_computer.png";
    this.image_local="assets/imgs/rio.jpg";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadProfilePhotoPage');
  }

  gotToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url, image_local: this.image_local, from: 'picture_profile'});
  }

  TakeaPicture(){
    this.cam.selectImage(1, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
      this.restProvider.sendFile(this.image_local).then((res_file: resFile) => {
        this.image_url = res_file.url;
        this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url,  image_local: this.image_local, from: 'picture_profile'});
      }).catch((error) => {
        alert("Send file to server error!");
      })
    }, err => {
    });
  }

  navToGallery() {
    this.cam.selectImage(0, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
      this.restProvider.sendFile(this.image_local).then((res_file: resFile) => {
        this.image_url = res_file.url;
        this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url,  image_local: this.image_local, from: 'picture_profile'});
      }).catch((error) => {
        alert("Send file to server error!");
      })
    }, err => {
    });
  }

}

