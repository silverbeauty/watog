import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { countries } from '../../models/model';
import { DataProvider, RestProvider } from '../../providers';
import { ElementRef } from '@angular/core';
import { LoginPage } from "../login/login";
import {Auth, User} from "../../types"
import {RegisterTwoOfThreePage} from "../register-two-of-three/register-two-of-three";
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
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    cell_phone: '',
    country: '',
    pseudo: '',
    hospital: '',
    password: '',
    pass_conf: '',
    user_name: '',
    job: '',
    picture_profile: '',
    picture_cover: '',
    proof_of_status_date:'',
    proof_of_status: '',
    token: '',
    sms_verified_date: '',
    email_verified_date: '',
  }

  public promise : any;
  private getMe : any ;
  countries : any[] = countries;
  public profile_image : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public profil: DataProvider, public restProvider : RestProvider, public dataProvider: DataProvider) {
      /*this.promise = Promise.all([this.profil.get()]);
      this.promise.then(res => {
        return JSON.parse(res);
      })
      .then(data => {
        this.user.password = data.password;
        this.user.pass_conf = data.password;
      })*/

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.dataProvider.getProfile().then((auth: Auth) => {
      // Set as publidc data

      this.user.first_name = auth.first_name;
      this.user.last_name = auth.last_name;
      this.user.email = auth.email;
      this.user.cell_phone = auth.cell_phone;
      this.user.country = auth.country;
      this.user.hospital = auth.hospital;
 //     this.user.pseudo = auth.pseudo;
      this.profile_image = auth.picture_profile;

    }).catch((error) => {
      alert('Invalid input');
    })
  }

  setCurrentUser(name, lastname, pseudo, email, phone, country, hospital){
/*
    this.restProvider.signUp(this.user as User).then((auth: Auth) => {
      // Save profile
      this.dataProvider.saveProfile(auth);
      this.navCtrl.push(RegisterTwoOfThreePage);
    }).catch((error) => {
      alert('Invalid input');
    })
    Promise.all([this.rest.getProfile()]).then(tab => {
        let data = tab[0];
        data.first_name = name;
        data.last_name = lastname;
        data.email = email;
        data.cell_phone = phone;
        data.country = country;
        data.hospital = hospital;
        console.log(data)
    })
*/

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
this.todo.other_speciality = data.
let NAME = document.querySelector("input[name='first_name']");
let SURNAME = document.querySelector("input[name='last_name']");
let EMAIL = document.querySelector("input[name='email']");
let PHONE = document.querySelector("input[name='cell_phone']");
let COUNTRY = document.querySelector("input[name='country']");
let HOSPITAL = document.querySelector("input[name='hospital']");

****/
