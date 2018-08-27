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
  public image_base64_p: any;
  public image_choose_p: any;
  public image_url_p: any;
  public image_local_p: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cam: CameraProvider, public restProvider: RestProvider) {
    this.image_base64_p = "assets/imgs/appareil.png";
    this.image_choose_p = "assets/imgs/on_your_computer.png";
    this.image_local_p = "assets/imgs/rio.jpg";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadProfilePhotoPage');
  }

  gotToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url_p, image_local: this.image_local_p, from: 'picture_profile'});
  }

  TakeaPicture(){
    this.cam.selectImage(1, 0).then(resp => {
      this.image_local_p = "data:image/jpeg;base64," + resp;
      this.navCtrl.push(RegisterOneOfThreePage, {image_local: this.image_local_p, from: 'picture_profile'});
    }, err => {
      alert("error send parm, pictures of profile camera not save")
    });
  }

  navToGallery() {
    this.cam.selectImage(0, 0).then(resp => {
      this.image_local_p = "data:image/jpeg;base64," + resp;
      this.navCtrl.push(RegisterOneOfThreePage, {image_local: this.image_local_p, from: 'picture_profile'});
    }, err => {
      alert("error send param, picture of profile not selected")
    });
  }

}
/*

navToGallery() {
  this.cam.selectImage(0, 0).then(resp => {
    this.image_local_p = "data:image/jpeg;base64," + resp;
    this.restProvider.sendFile(this.image_local_p).then((res_file: resFile) => {
      this.image_url_p = res_file.url;
      this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url_p,  image_local: this.image_local_p, from: 'picture_profile'});
    }).catch((error) => {
      alert("Send file to server error!");
    })
  }, err => {
  });
}

TakeaPicture(){
  this.cam.selectImage(1, 0).then(resp => {
    this.image_local_p = "data:image/jpeg;base64," + resp;
    this.restProvider.sendFile(this.image_local_p).then((res_file: resFile) => {
      this.image_url_p = res_file.url;
      this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url_p,  image_local: this.image_local_p, from: 'picture_profile'});
    }).catch((error) => {
      alert("Send file to server error!");
    })
  }, err => {
  });
}

      this.restProvider.sendFile(this.base64Image).then((res_file: resFile) => {
        console.info('Send File Response:', res_file)
        // Save file
        //this.dataProvider.saveFile(this.base64Image, res_file.url);
        this.image = res_file.url;
*/
