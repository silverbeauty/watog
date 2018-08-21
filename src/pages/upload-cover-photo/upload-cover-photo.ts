import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { CameraProvider } from '../../providers/camera/camera';
import {Auth, resFile} from "../../types";
import {DashboardPage} from "../dashboard/dashboard";
import { DataProvider, RestProvider } from '../../providers';


@IonicPage()
@Component({
  selector: 'page-upload-cover-photo',
  templateUrl: 'upload-cover-photo.html',
})
export class UploadCoverPhotoPage {
  public base64Image: any;
  public chooseImg: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cam : CameraProvider, public restProvider: RestProvider, public dataProvider: DataProvider) {
    this.base64Image = "../../assets/imgs/appareil.png";
    this.chooseImg = "../../assets/imgs/on_your_computer.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadCoverPhotoPage');
  }

  gotToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage);
  }

  TakeaPicture(){
    this.cam.photo(this.base64Image).then((imageData) => {

        this.base64Image = 'data:image/jpeg;base64,' +imageData;

      this.restProvider.sendFile(this.base64Image).then((res_file: resFile) => {
        console.info('Send File Response:', res_file)
        // Save file
        this.dataProvider.saveFile(this.base64Image, res_file.url);

      }).catch((error) => {
        alert(error);
      })

        alert(this.base64Image);

    });
  }

  navToGallery(){
    this.cam.choosePicture()
      .then((results) => {

        for (var i = 0; i < results.length; i++) {
          this.chooseImg = results[i];
        }
      },(err) => {
          alert("Error"+ err)
      });
  }
}
