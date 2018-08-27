import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { countries } from '../../models/model';
import { DataProvider, RestProvider } from '../../providers';
import { ElementRef } from '@angular/core';
import { LoginPage } from "../login/login";
import { Auth } from "../../types"
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

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public profil: DataProvider, public rest : RestProvider, public data: DataProvider) {
      /*this.promise = Promise.all([this.profil.get()]);
      this.promise.then(res => {
        return JSON.parse(res);
      })
      .then(data => {
        this.user.password = data.password;
        this.user.pass_conf = data.password;
      })*/
    Promise.all([this.data.getProfile()]).then(tab => {
      let data = tab[0];
      this.user.first_name = data.first_name;
      this.user.last_name = data.last_name;
      this.user.email = data.email;
      this.user.cell_phone = data.cell_phone;
      this.user.country = data.country;
      this.user.hospital = data.hospital;
      this.user.pseudo = data.pseudo;
      this.profile_image = data.picture_profile;
    })
    }

/*  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    Promise.all([this.rest.getProfile()]).then(tab => {
      console.log(tab)
      let data = tab[0];
      this.todo.first_name = data.first_name;
      this.todo.last_name = data.last_name;
      this.todo.email = data.email;
      this.todo.cell_phone = data.cell_phone;
      this.todo.country = data.country;
      this.todo.hospital = data.hospital;
      this.todo.
    })
  }*/

  setCurrentUser(name, lastname, pseudo, email, phone, country, hospital){
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
    this.data.clearProfile();
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
