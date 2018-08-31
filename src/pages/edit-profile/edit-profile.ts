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
    pass_conf: '',
    password: '',
    user_name: '',
    job: '',
    picture_profile: '',
    picture_cover: '',
    proof_of_status_date:'',
    proof_of_status: ''
  }

  public profile_image: string = "assets/imgs/rio.jpg";
  public promise : any;
  private getMe : any ;
  countries : any[] = countries;
  server_url: any = server_url;


  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient, public profil: DataProvider,
    public restProvider : RestProvider, public dataProvider: DataProvider
  ) {
      this.promise = Promise.all([this.profil.get()]);
      this.promise.then(res => {
        return JSON.parse(res);
      })
      .then(data => {
        this.profile_image = data.profile_image;
        this.user.password = data.password;
        this.user.pass_conf = data.password;
      })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.promise = Promise.all([this.profil.get()]);
    this.promise.then(res => {
      return JSON.parse(res);
    })
      .then(data => {
        this.user.first_name = data.first_name;
        this.user.last_name = data.last_name;
        this.user.email = data.email;
        this.user.cell_phone = data.cell_phone;
        this.user.country = data.country;
        this.user.hospital = data.hospital;
        this.user.picture_profile = data.picture_profile;
        this.profile_image = data.profile_image;
      })
  }

  setCurrentUser(){
    this.restProvider.setProfile(this.user as User).then((auth: Auth) => {
      // Set profile
      this.dataProvider.saveProfile(auth);
      this.navCtrl.push(RegisterTwoOfThreePage);
    }).catch((error) => {
      alert('Invalid input');
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
