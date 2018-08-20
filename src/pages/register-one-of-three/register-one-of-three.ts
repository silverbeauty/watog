import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { countries } from '../../models/model';
import { LoginPage } from '../login/login';
import { UploadCoverPhotoPage } from '../upload-cover-photo/upload-cover-photo';
import { UploadProfilePhotoPage } from '../upload-profile-photo/upload-profile-photo';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { server_url } from '../../environments/environment'
import { RegisterTwoOfThreePage } from '../register-two-of-three/register-two-of-three';
// FormBuilder
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-register-one-of-three',
  templateUrl: 'register-one-of-three.html',
})


export class RegisterOneOfThreePage {
  public registerForm: FormGroup;
  public registerInfo: any = {
    first_name: "",
    last_name: "",
    password: "",
    pass_conf: "",
    email: "",
    cell_phone: null,
    country: "",
    hospital:"",
    other_speciality: ""
  }
  public submitAttempt: boolean = false;
  countries : any[] = countries;
  server_url: any = server_url;


  //
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      pseudo: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      hospital: [''],
      qualification: ['', Validators.compose([Validators.required])],
    });
  }

  /** Request Http **/

  logForm(){

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    try{
      this.http.post(this.server_url+'/users', JSON.stringify(this.registerInfo), {headers: httpHeaders}).subscribe(data => {
        console.log(data);
        if((typeof data) == "object"){
          if(status == "true"){
            alert('true');
          }else{
            alert('false');
          }
        }
        else{
          console.log("data is not define");
        }
      })
    } catch (e){console.log("http.post returned :" + e);}

  }

  /** Navigation **/

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToRegisterTwoOfThree(){
    
    this.registerInfo = {
      first_name: this.registerForm.controls.firstName.value,
      last_name: this.registerForm.controls.lastName.value,
      password: this.registerForm.controls.password.value,
      pass_conf: this.registerForm.controls.confirmPassword.value,
      email: this.registerForm.controls.email.value,
      cell_phone: this.registerForm.controls.phone.value,
      country: this.registerForm.controls.country.value,
      hospital:this.registerForm.controls.hospital.value,
      other_speciality: '',
    }
    console.log(this.registerForm.controls);
    console.log(this.registerInfo);
    if(this.registerForm.valid){
      this.navCtrl.push(RegisterTwoOfThreePage);
    }
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
    document.getElementById('qualificationInputMenu').style.display = 'flex';
  }

  closeMenu(){
    document.getElementById('qualificationInputMenu').style.display = 'none';
  }

  selectQualification(qualification){
    this.registerForm.controls['qualification'].setValue(document.getElementById('qualificationInput').innerHTML);
    this.registerInfo.other_speciality = this.registerForm.controls['qualification'].value;
    document.getElementById('qualificationInput').innerHTML = qualification;
    this.closeMenu();
  }

  specifyQualification(){
    alert('test');
  }

  saveOtherSpeciality() {
    if(this.registerInfo.other_speciality != '') {
      this.selectQualification(this.registerInfo.other_speciality);
      var btnClose = document.getElementById("btn-modal-close") as any;
      btnClose.click();
    }
  }

  cancelOtherSpeciality() {
    this.selectQualification('Select qualification');
    this.registerInfo.other_speciality = "";
  }
}
