import { Component, isDevMode } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    base64Image: "",
    description: ""
  }
  public image_url: any;
  public image_local: string;

  public submit = {
    category_id: null,
    picture: "",
    description:""
  }

  public file_name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cam : CameraProvider, public dataProvider:DataProvider, public restProvider: RestProvider) {
    this.submit.category_id = this.navParams.data.id;
  }

  ionViewDidLoad() {

  }

  logForm(){
    const myCat = "?category_id="+this.submit.category_id;

    this.restProvider.postADoc(this.submit).then((data) =>{
      console.log("post doc: ",data)
    });
    this.restProvider.getAllPost(myCat).then(data => {
      console.log("get all post: ",data)
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

  goToContestSubmited(image_local){
    //console.log('ionViewDidLoad ContestSubmitPage');
    this.restProvider.sendFile(image_local)
      .then((res_file: resFile) => {
        this.submit.picture = "salut"
        //res_file.url;
        alert(JSON.stringify(this.submit))
      })
      .catch(err => {
        alert("image local not send")
      })
    console.log("pic Submit", this.submit.picture)
    this.navCtrl.push(ContestSubmitedPage);
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
      alert("picture saved")
    }, err => {
      alert("error send parm, pictures of profile camera not save")
    });
    this.goToContestSubmited(this.image_local);
  }

  navToGallery() {
    if (isDevMode) {
      const input = document.createElement('input');
      input.type = 'file';
      input.click();

    } else {
      this.cam.selectImage(0, 0).then(resp => {
        this.image_local = "data:image/jpeg;base64," + resp;
        alert("picture saved")
      }, err => {
        alert("error send param, picture of profile not selected")
      });
    }
    this.goToContestSubmited(this.image_local);
  }
}
