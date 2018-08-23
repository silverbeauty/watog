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
  public todo = {
    first_name: "",
    last_name: "",
    pseudo: "",
    password: "",
    pass_conf: "",
    email: "",
    cell_phone: null,
    country: "",
    hospital:"",
    other_speciality: ""
  }

  public promise : any;
  private getMe : any ;
  countries : any[] = countries;
  server_url: any = server_url;


  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient, public profil: DataProvider,
    public rest : RestProvider, public dataProvider: DataProvider
  ) {
      this.promise = Promise.all([this.profil.get()]);
      this.promise.then(res => {
        return JSON.parse(res);
      })
      .then(data => {
        this.todo.password = data.password;
        this.todo.pass_conf = data.password;
      })
    }

  ionViewDidLoad() {
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
    })
  }

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
