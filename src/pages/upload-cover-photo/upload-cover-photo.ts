import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { CameraProvider } from '../../providers/camera/camera';
import { resFile} from "../../types";
import {  RestProvider } from '../../providers';
import {EditProfilePage} from "../edit-profile/edit-profile";



@IonicPage()
@Component({
  selector: 'page-upload-cover-photo',
  templateUrl: 'upload-cover-photo.html',
})
export class UploadCoverPhotoPage {
  public image_base64: any;
  public image_choose: any;
  public image_url: any;
  public spam : boolean = true;

  public backPage: any;
  public photo: any = {
    base64Image: '',
    description: ''
  }

  public submit = {
    category_id: null,
    picture: '',
    description: ''
  }

  public state = {
    isUploading: false,
    isPosting: false
  }

  public image_local: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public cam : CameraProvider, public restProvider: RestProvider) {
    this.image_base64 = "assets/imgs/appareil.png";
    this.image_choose = "assets/imgs/on_your_computer.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadCoverPhotoPage');
  }

  gotToProfile(){
    this.navCtrl.push( EditProfilePage, {image_url: this.image_url });
  }

  TakeaPicture(){
    let myCam = this.cam.selectImage(1, 0).then(resp => {
      return this.image_url = "data:image/jpeg;base64," + resp;
    }, err => {
      console.log("error send param, picture of profile not selected")
    });
    myCam.then(data => {
      this.uploadPhoto(data)
    })
  }

  navToGallery() {
    let myCam = this.cam.selectImage(0, 0).then(resp => {
      return this.image_url = "data:image/jpeg;base64," + resp;
    }, err => {
      console.log("error send param, picture of profile not selected")
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


  uploadPhoto(img) {
    //console.log('ionViewDidLoad ContestSubmitPage');
    //alert(JSON.stringify(img))
    this.state.isUploading = true;
    setTimeout(() => { this.state.isUploading = false; }, 3000);
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
        if(this.spam){
          let alert = this.alertCtrl.create({
            title: 'Failed to upload',
            subTitle: 'Failed to upload photo',
            buttons: [
            { text: 'Cancel', handler: () =>{
              this.closeLocalImage()
            }}]
          });
          alert.present();
          this.spam = false;
        }
      });
  }
}
