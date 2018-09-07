import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { CameraProvider } from '../../providers/camera/camera';
import { resFile} from "../../types";
import {  RestProvider } from '../../providers';
import { BestPhotoWithTheWatogLogoPage } from "../best-photo-with-the-watog-logo/best-photo-with-the-watog-logo";
import { BestGroupPhotoWithTheWatogLogoPage } from "../best-group-photo-with-the-watog-logo/best-group-photo-with-the-watog-logo";


/**
 * Generated class for the UploadWatogLogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-watog-logo',
  templateUrl: 'upload-watog-logo.html',
})
export class UploadWatogLogoPage {
  public image_base64: any;
  public image_choose: any;
  public image_url: any;
  public page_link: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cam : CameraProvider, public restProvider: RestProvider) {
    this.image_base64 = "assets/imgs/appareil.png";
    this.image_choose = "assets/imgs/on_your_computer.png";
    this.page_link = this.navParams.data.from;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadWatogLogoPage');
  }

  TakeaPicture(){
    this.cam.selectImage(1, 0).then(resp => {
      this.image_url = "data:image/jpeg;base64," + resp;
      this.restProvider.sendFile(this.image_url).then((res_file: resFile) => {
        this.image_url = res_file.url;
        if(this.page_link == "BestPhotoWithTheWatogLogoPage"){
          this.navCtrl.push(BestPhotoWithTheWatogLogoPage, {image_url: this.image_url });
        }else{
          this.navCtrl.push(BestGroupPhotoWithTheWatogLogoPage, {image_url: this.image_url });
        }
      }).catch((error) => {
        alert("Send file to server error!");
        alert(JSON.stringify(error))
      })
    }, err => {
    });
  }

  navToGallery() {
    this.cam.selectImage(0, 0).then(resp => {
      this.image_url = "data:image/jpeg;base64," + resp;
      this.restProvider.sendFile(this.image_url).then((res_file: resFile) => {
        this.image_url = res_file.url;
        if(this.page_link == "BestPhotoWithTheWatogLogoPage"){
          this.navCtrl.push(BestPhotoWithTheWatogLogoPage, {image_url: this.image_url });
        }else{
          this.navCtrl.push(BestGroupPhotoWithTheWatogLogoPage, {image_url: this.image_url });
        }
      }).catch((error) => {
        alert("Send file to server error!");
        alert(JSON.stringify(error))
      })
    }, err => {
    });
  }
  goBack(){
    if(this.page_link == "BestPhotoWithTheWatogLogoPage"){
      this.navCtrl.push(BestPhotoWithTheWatogLogoPage, {image_url: this.image_url });
    }else{
      this.navCtrl.push(BestGroupPhotoWithTheWatogLogoPage, {image_url: this.image_url });
    }
  }
}
