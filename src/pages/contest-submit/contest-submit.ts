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
  public image_local: string = null;

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
    //this.dataProvider.setVariable("category_id_up", this.navParams.data.id)
    console.log("ma cat: ", this.submit.category_id)
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
      //return;
    }
    alert(JSON.stringify(this.submit))
    this.state.isPosting = true;
    this.restProvider.postADoc(this.submit).then((data) =>{
      console.info('Posted:', data)
      this.state.isPosting = false;
      this.navCtrl.push(ContestSubmitedPage);
    }).catch((e) => {
      console.log(JSON.stringify(e))
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Sorry, failed to post your Photo to Watog!',
        buttons: [
          { text: 'Cancel', handler: () =>{
            this.closeLocalImage()
          }},
          { text: 'Retry', handler: () => {
            this.onSubmit();
          }}]
      });
      alert.present();
    })
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

  uploadPhoto(img) {
    //console.log('ionViewDidLoad ContestSubmitPage');
    alert(JSON.stringify(img))
    this.state.isUploading = true;
    const strImage = this.image_local;
    this.restProvider.sendFile(this.image_local)
      .then((res_file: resFile) => {
        this.state.isUploading = false;
        if (this.image_local === strImage) {
          this.submit.picture = res_file.url          
        }
      })
      .catch(err => {
        this.state.isUploading = false;
        let alert = this.alertCtrl.create({
          title: 'Failed to upload',
          subTitle: 'Failed to upload photo',
          buttons: [
          { text: 'Cancel', handler: () =>{
            this.closeLocalImage()
          }},
          { text: 'Retry', handler: () => {
            this.uploadPhoto(img)
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
    let myCam = this.cam.selectImage(1, 0).then(resp => {
      return this.image_local = "data:image/jpeg;base64," + resp;
    }, err => {
    });
    myCam.then(data => {
      this.uploadPhoto(data)
    })
  }

  navToGallery() {

      let myCam = this.cam.selectImage(0, 0).then(resp => {
        return this.image_local = "data:image/jpeg;base64," + resp;
      }, err => {
        alert("error send param, picture of profile not selected")
      });
      myCam.then(data => {
        this.uploadPhoto(data)
      })
  }

  closeLocalImage () {
    this.state.isUploading = false;
    this.image_local = ''
    this.submit.picture = ''
  }
}
/***

if (isDevMode) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/png, image/jpeg';
  input.multiple = false;
  input.click();
  const self = this;
  input.onchange = function(e) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      self.image_local = reader.result.toString();
      self.uploadPhoto();
    };
    reader.onerror = (error) => {
      console.error(error);
      alert('Failed to open file!')
    };
  };
} else {

if (isDevMode) {
  const input = document.createElement('input');
  input.type = 'file';
  input.click();

} else {

**/
