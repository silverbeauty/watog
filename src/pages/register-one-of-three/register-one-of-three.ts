import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import { countries } from '../../models/model';
import { LoginPage } from '../login/login';
import { UploadCoverPhotoPage } from '../upload-cover-photo/upload-cover-photo';
import { UploadProfilePhotoPage } from '../upload-profile-photo/upload-profile-photo';
import { RegisterTwoOfThreePage } from '../register-two-of-three/register-two-of-three';
import {DashboardPage} from "../dashboard/dashboard";
import {Auth, User} from "../../types";
import { DataProvider, RestProvider, PhoneValidator, PasswordValidator} from '../../providers';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
    password: '',
    user_name: '',
    job: '',
    picture_profile: '',
    picture_cover: '',
    proof_of_status_date:'',
    proof_of_status: ''
  }

  public image = {
    from: "",
    image_link: "",
    image_local: ""
  }

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  countries : any[] = countries;
  public profile_image: string = "assets/imgs/rio.jpg";
  //
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public restProvider: RestProvider, public dataProvider: DataProvider) {
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
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });
    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    this.validations_form = this.formBuilder.group({
      first_name: ['', Validators.compose([
        Validators.required
      ])],
      last_name: ['', Validators.compose([
        Validators.required
      ])],
      user_name:  ['', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(5),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      country_phone: this.country_phone_group,
      matching_passwords: this.matching_passwords_group,
      hospital: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  /** Request Http **/

  register(){
    this.user.job = this.getQualifiction();
    this.restProvider.signUp(this.user as User).then((auth: Auth) => {
      // Save profile
      this.dataProvider.saveProfile(auth);
      this.navCtrl.push(RegisterTwoOfThreePage);
    }).catch((error) => {
      alert('Invalid input');
    })
  }

  /** Navigation **/

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  navToUploadCoverPhoto(){
    alert("Unavailable service");
  }

  navToUploadProfilePhoto(){
    this.navCtrl.push(UploadProfilePhotoPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterOneOfThreePage');
    this.user.picture_profile = this.profile_image;
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

  getQualifiction(){
    return document.getElementById('qualificationInput').innerHTML;
  }

  specifyQualification(){
    alert('test');
  }

  saveOtherSpeciality() {
      if(this.user.job != '') {
        this.selectQualification(this.user.job);
        var btnClose = document.getElementById("btn-modal-close") as any;
        btnClose.click();
      }
  }

  cancelOtherSpeciality() {
    this.selectQualification('Select qualification');
    this.user.job = "";
  }

  validation_messages = {
    'user_name': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' }
    ],
    'first_name': [
      { type: 'required', message: 'First Name is required.' }
    ],
    'last_name': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'hospital': [
      { type: 'required', message: 'Hospital is required.' }
    ]
  };
}
