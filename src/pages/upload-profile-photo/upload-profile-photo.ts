import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { CameraProvider } from '../../providers/camera/camera';
import {resFile} from "../../types";
import { DataProvider, RestProvider } from '../../providers';
import { Base64 } from '@ionic-native/base64';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public cam: CameraProvider, public restProvider: RestProvider, private base64: Base64) {
    this.image_base64 = "assets/imgs/appareil.png";
    this.image_choose = "assets/imgs/on_your_computer.png";
    this.image_local ="assets/imgs/rio.jpg";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadProfilePhotoPage');
  }

  gotToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url, image_local:this.image_local , from: 'picture_profile'});
  }

  TakeaPicture(){
    this.cam.photo().then((imageData) => {

      this.image_local = 'data:image/jpeg;base64,' +imageData;
      this.restProvider.sendFile(this.image_base64).then((res_file: resFile) => {
        console.info('Send File Response:', res_file)
        console.log(res_file.url);
        this.image_url = res_file.url;
        this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url, image_local: this.image_local, from: 'picture_profile'});
      }).catch((error) => {
        alert(error);
      })
    });
  }

  navToGallery() {
    this.cam.choosePicture()
      .then((results) => {

        for (var i = 0; i < results.length; i++) {

          this.base64.encodeFile(results[i]).then((base64File: string) => {
            this.image_local = results[i];
          }, (err) => {
            console.log(err);
          });
        }

        this.restProvider.sendFile(this.image_local).then((res_file: resFile) => {
          console.info('Send File Response:', res_file)
          // Save file
          this.image_url = res_file.url;
          this.navCtrl.push(RegisterOneOfThreePage, {image_url: this.image_url, image_local: this.image_local, from: 'picture_profile'});
        }, (err) => {

          alert("Send File Error" + err)
        });
      }, (err) => {
        alert("Choose Picture Error" + err)
      });
  }
}
