import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { countries } from '../../models/model';
import { LoginPage } from '../login/login';
import { UploadCoverPhotoPage } from '../upload-cover-photo/upload-cover-photo';
import { UploadProfilePhotoPage } from '../upload-profile-photo/upload-profile-photo';
//import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { server_url } from '../../environments/environment'
import { RegisterTwoOfThreePage } from '../register-two-of-three/register-two-of-three';



@IonicPage()
@Component({
  selector: 'page-register-one-of-three',
  templateUrl: 'register-one-of-three.html',
})


export class RegisterOneOfThreePage {
  public todo = {
    first_name: "",
    last_name: "",
    password: "",
    pass_conf: "",
    email: "",
    cell_phone: null,
    country: "",
    hospital:"",
  }
  countries : any[] = countries;
  server_url: any = server_url;


  //private http: HttpClient 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
  /*
  logForm(){

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    try{
      this.http.post(this.server_url+'/users', JSON.stringify(this.todo), {headers: httpHeaders}).subscribe(data => {

        console.log(data);
        if(data.status == "true"){
          alert('true');
        }else{
          alert('false');
        }
      })
    } catch (e){console.log("http.post returned :" + e);}

  }
  */

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterOneOfThreePage');
  }

  navToUploadCoverPhoto(){
    this.navCtrl.push(UploadCoverPhotoPage);
  }

  navToUploadProfilePhoto(){
    this.navCtrl.push(UploadProfilePhotoPage);
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

  goToRegisterTwoOfThree(){
    this.navCtrl.push(RegisterTwoOfThreePage);
  }

  specifyQualification(){
    alert('test');
  }
}
