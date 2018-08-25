import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import { countries } from '../../models/model';
import { LoginPage } from '../login/login';
import { UploadCoverPhotoPage } from '../upload-cover-photo/upload-cover-photo';
import { UploadProfilePhotoPage } from '../upload-profile-photo/upload-profile-photo';
import { RegisterTwoOfThreePage } from '../register-two-of-three/register-two-of-three';
import {DashboardPage} from "../dashboard/dashboard";
import {Auth, User} from "../../types";
import { DataProvider, RestProvider } from '../../providers';



@IonicPage()
@Component({
  selector: 'page-register-one-of-three',
  templateUrl: 'register-one-of-three.html',
})


export class RegisterOneOfThreePage {
  public user = {
    first_name: '',
    last_name: '',
    email: '',
    cell_phone: '',
    country: '',
    hospital: '',
    pass_conf: '',
    pseudo: '',
    picture_profile: '',
    picture_cover: '',
    other_speciality: '',
    proof_of_status_date:'',
    proof_of_status: ''
  }

  public image = {
    from: "",
    image_link: "",
    image_local: ""
  }

  countries : any[] = countries;
  profile_image: string = "assets/imgs/rio.jpg";
  //
  constructor(public navCtrl: NavController, public navParams: NavParams,  public restProvider: RestProvider, public dataProvider: DataProvider) {
    const params = this.navParams.data;
    if(params.image_local){
      this.image = params;
      if(this.image.from == 'picture_profile'){
        this.profile_image = this.image.image_local;
        this.user.picture_profile = this.image.image_link;
      }else if(this.image.from == 'picture_cover'){
        this.user.picture_cover = this.image.image_link;
      }else{
        alert('Image from Unknown Page')
      }
    }
  }

  /** Request Http **/

  logForm(){

    this.restProvider.signUp(this.user as User).then((auth: Auth) => {
      console.info('Login Response:', auth)
      // Save profile
      this.dataProvider.saveProfile(auth);
      this.navCtrl.push(DashboardPage)
    }).catch((error) => {
      alert('Invalid input');
    })
  }

  /** Navigation **/

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToRegisterTwoOfThree(){
    this.navCtrl.push(RegisterTwoOfThreePage);
  }

  navToUploadCoverPhoto(){
    this.navCtrl.push(UploadCoverPhotoPage);
  }

  navToUploadProfilePhoto(){
    this.navCtrl.push(UploadProfilePhotoPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterOneOfThreePage');
  }

  /*Methods for the html dom modification */
  openMenu(){
    document.getElementById('qualificationInputMenu').style.bottom = '0';
  }

  closeMenu(){
    document.getElementById('qualificationInputMenu').style.bottom = '-100vh';
  }

  selectQualification(qualification){
    document.getElementById('qualificationInput').innerHTML = qualification;
    this.closeMenu();
  }

  specifyQualification(){
    alert('test');
  }

  saveOtherSpeciality() {
    if(this.user.other_speciality != '') {
      this.selectQualification(this.user.other_speciality);
      var btnClose = document.getElementById("btn-modal-close") as any;
      btnClose.click();
    }
  }

  cancelOtherSpeciality() {
    this.selectQualification('Select qualification');
    this.user.other_speciality = "";
  }
}
