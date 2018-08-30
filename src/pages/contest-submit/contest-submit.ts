import { Component, isDevMode } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { SettingsPage } from '../settings/settings';
import { ContestSubmitedPage } from '../contest-submited/contest-submited';
import { DataProvider } from '../../providers/data/data';
import { CameraProvider } from '../../providers/camera/camera';
import { resFile } from "../../types";
import {  RestProvider } from '../../providers';
import { Auth, File } from "../../types";


/**
 * Generated class for the ContestSubmitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest-submit',
  templateUrl: 'contest-submit.html',
})
export class ContestSubmitPage {
  public photo: any = {
    base64Image: '',
    description: ''
  }
  public image_url: any;
  public image_local: string;

  public submit = {
    category_id: null,
    picture: '',
    description: ''
  }

  public state = {
    isUploading: false,
    isPosting: false
  }

  public file_name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public cam : CameraProvider, public dataProvider:DataProvider, public restProvider: RestProvider) {
    this.submit.category_id = this.navParams.data.id;
  }

  ionViewDidLoad() {}

  onSubmit(){

    if (!this.submit.picture) {
      let alert = this.alertCtrl.create({
        title: 'No photo uploaded',
        subTitle: 'Please upload a photo first',
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    }

    this.state.isPosting = true;
    this.restProvider.postADoc(this.submit).then((data) =>{
      this.state.isPosting = false;
      this.navCtrl.push(ContestSubmitedPage);
    });
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  uploadPhoto() {
    //console.log('ionViewDidLoad ContestSubmitPage');
    this.restProvider.sendFile(this.image_local)
      .then((res_file: resFile) => {
        this.submit.picture = res_file.url
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Failed to upload',
          subTitle: 'Failed to upload photo',
          buttons: ['Cancel', { text: 'Retry', handler: () => {
            this.uploadPhoto()         
          }}]
        });
        alert.present();
      });
  }

  goBack(){
    this.navCtrl.pop();
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

  TakeaPicture(){
    this.cam.selectImage(1, 0).then(resp => {
      this.image_local = "data:image/jpeg;base64," + resp;
      this.uploadPhoto()
    }, err => {
      alert("error send parm, pictures of profile camera not save")
    });
  }

  navToGallery() {
    if (isDevMode) {
      const input = document.createElement('input');
      input.type = 'file';
      input.click();

    } else {
      this.cam.selectImage(0, 0).then(resp => {
        this.image_local = "data:image/jpeg;base64," + resp;
        this.uploadPhoto()
      }, err => {
        alert("error send param, picture of profile not selected")
      });
    }
  }
}
