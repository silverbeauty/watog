import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { RegisterTwoOfThreePage } from '../register-two-of-three/register-two-of-three';
import { countries } from '../../models/model';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { server_url } from '../../environments/environment';
import { DataProvider, RestProvider } from '../../providers';
import { ElementRef } from '@angular/core';
import {LoginPage} from "../login/login";
import {Auth, User} from "../../types";
import {UploadProfilePhotoPage} from "../upload-profile-photo/upload-profile-photo";

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  public user = {
    first_name: '',
    last_name: '',
    email: '',
    cell_phone: '',
    country: '',
    hospital: '',
    password: '',
    user_name: '',
    job: '',
    picture_profile: '',
    picture_cover: '',
    proof_of_status_date:'',
    proof_of_status: ''
  }

  public image = {
    image_url: "",
    profile_selected: false
  }

  public profile_image: string = "assets/imgs/rio.jpg";
  public promise : any;
  countries : any[] = countries;


  constructor( public navCtrl: NavController, public navParams: NavParams, public restProvider : RestProvider, public dataProvider: DataProvider) {
    this.dataProvider.getProfile().then((profile: Auth) => {
      this.profile_image = profile.picture_profile;
    })
    const params = this.navParams.data;
    if(params.image_url) {
      this.image = params;
      this.profile_image = this.image.image_url;
      this.user.picture_profile = this.image.image_url;
    }
  }


  ionViewDidLoad() {
    this.dataProvider.getProfile().then((profile: User) => {
      this.user = profile;
    })
  }

  setCurrentUser(){
    this.restProvider.setProfile(this.user as User).then((user: User) => {
      // Save profile
      const profile_user: User = user;
      this.dataProvider.saveUser(profile_user);
      alert('Profile Updated')
      this.navCtrl.push(SettingsPage);
    }).catch((error) => {
      alert('Invalid input');
    })
  }

  navToUploadProfilePhoto(){
    alert('You will lose your pre-entered profile field value!')
    this.navCtrl.push(UploadProfilePhotoPage);
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

  goBack(){
    this.navCtrl.pop();
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}

/****


this.todo.password  = data.
this.todo.pass_conf  = data.
this.todo.job = data.
let NAME = document.querySelector("input[name='first_name']");
let SURNAME = document.querySelector("input[name='last_name']");
let EMAIL = document.querySelector("input[name='email']");
let PHONE = document.querySelector("input[name='cell_phone']");
let COUNTRY = document.querySelector("input[name='country']");
let HOSPITAL = document.querySelector("input[name='hospital']");

****/
