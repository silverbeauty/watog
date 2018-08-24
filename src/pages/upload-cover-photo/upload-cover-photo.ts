import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { CameraProvider } from '../../providers/camera/camera';
import {Auth, resFile} from "../../types";
import {DashboardPage} from "../dashboard/dashboard";
import { DataProvider, RestProvider } from '../../providers';
import {Base64} from "@ionic-native/base64";


@IonicPage()
@Component({
  selector: 'page-upload-cover-photo',
  templateUrl: 'upload-cover-photo.html',
})
export class UploadCoverPhotoPage {
  public image_base64: any;
  public image_choose: any;
  public image_url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cam : CameraProvider, public restProvider: RestProvider) {
    this.image_base64 = "assets/imgs/appareil.png";
    this.image_choose = "assets/imgs/on_your_computer.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadCoverPhotoPage');
  }

  gotToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url,  from: 'picture_cover'});
  }

  TakeaPicture(){
    this.cam.selectImage(1, 0).then(resp => {
      this.image_url = "data:image/jpeg;base64," + resp;
      this.restProvider.sendFile(this.image_url).then((res_file: resFile) => {
        this.image_url = res_file.url;
        this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url,  from: 'picture_cover'});
      }).catch((error) => {
        alert(error);
      })
    }, err => {
      alert(err);
    });
  }

  navToGallery() {
    this.cam.selectImage(0, 0).then(resp => {
      this.image_url = "data:image/jpeg;base64," + resp;
      this.restProvider.sendFile(this.image_url).then((res_file: resFile) => {
        this.image_url = res_file.url;
        this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url,  from: 'picture_cover'});
      }).catch((error) => {
        alert(error);
      })
    }, err => {
      alert(err);
    });

  }
}
