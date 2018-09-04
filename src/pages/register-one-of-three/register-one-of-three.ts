import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { countries } from '../../models/model';
import { LoginPage } from '../login/login';
import { UploadCoverPhotoPage } from '../upload-cover-photo/upload-cover-photo';
import { UploadProfilePhotoPage } from '../upload-profile-photo/upload-profile-photo';
import { RegisterTwoOfThreePage } from '../register-two-of-three/register-two-of-three';
import {DashboardPage} from "../dashboard/dashboard";
import {Auth, ObjUser, Country} from "../../types";
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
    user_name: '',
    email: '',
    cell_phone: '',
    country: '',
    hospital: '',
    password: '',
    job: '',
    picture_profile: '',
    picture_cover: ''
  }

  public image = {
    image_url: "",
    profile_selected: false
  }

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;


  countries: Country[];
  public profile_selected: boolean = false;
  public profile_image: string = "assets/imgs/rio.jpg";
  public country: Country = new Country("FR", "France")
  public promise : any;
  pass_conf: string = "";
  //
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public formBuilder: FormBuilder, public restProvider: RestProvider, public dataProvider: DataProvider) {
    const params = this.navParams.data;
    if(params.image_url){
      this.image = params;
      this.profile_image = this.image.image_url;
      this.user.picture_profile = this.image.image_url;
      this.profile_selected = this.image.profile_selected;
      if(this.profile_selected){
        this.promise = Promise.all([this.dataProvider.getObjUser()]);
        this.promise.then(res => {
          var data  = JSON.parse(res);
          this.user.first_name = data.first_name;
          this.user.last_name = data.last_name;
          this.user.user_name = data.user_name;
          this.user.email = data.email;
          this.user.cell_phone = data.cell_phone;
          this.user.password = data.password;
          this.pass_conf = data.password;
          this.user.country = data.country;
          this.user.hospital = data.hospital;
          this.user.job = data.job;
        })
          .catch(err =>{
            console.log(err)
          })
      }
    }
  }
  ionViewWillLoad() {
    this.countries = [
      new Country(countries[0].code, countries[0].name)
    ]
    for(var i = 1; i < countries.length; i ++){
      const County = new Country(countries[i].code, countries[i].name)
      this.countries.push(County);
    }

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
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

   /* profile_selected: ['', Validators.compose([
      Validators.requiredTrue
    ])],*/
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
      ])],
      job: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  checkFocus(){
    if(this.user.cell_phone.lastIndexOf('_')!=-1){
      this.user.cell_phone = (this.user.cell_phone.slice(0,-1))
    }
  }
  /** Request Http **/

  register(){
    if(this.user.cell_phone.lastIndexOf('_')!=-1){
      this.user.cell_phone = (this.user.cell_phone.slice(0,-1))
    }
    this.user.country = this.country.name;
    if(this.profile_selected != true){
      this.dataProvider.saveObjUser(this.user as ObjUser);
      alert("You have to choose profile picture!");
      this.navCtrl.push(UploadProfilePhotoPage);
    }
    this.restProvider.signUp(this.user as ObjUser).then((user: ObjUser) => {
      // Save Profile
      //this.dataProvider.saveProfile(auth);
      //this.navCtrl.push(RegisterTwoOfThreePage);
      const email = user.email;
      const password = this.user.password;
      return {email, password}
    }).then((data)=>{
        this.restProvider.login(data.email, data.password).then((auth: Auth) =>{
          // Save Profile
          this.dataProvider.saveProfile(auth);
          this.navCtrl.push(RegisterTwoOfThreePage);
        }).catch((error)=>{
          alert(error)
        })
    }).catch((error) => {
      alert(error);
    })
  }

  /** Navigation **/

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }


  navToUploadProfilePhoto(){
    this.navCtrl.push(UploadProfilePhotoPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterOneOfThreePage');
    this.user.picture_profile = this.profile_image;
    this.user.country = "France";
  }

  /*Methods for the html dom modification */
  openMenu(){
    document.getElementById('qualificationInputMenu').style.display = 'block';
  }

  closeMenu(){
    document.getElementById('qualificationInputMenu').style.display = 'none';
  }

  selectQualification(qualification){
    this.user.job = qualification;
    this.closeMenu();
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
    'profile_selected': [
      { type: 'required', message: 'Profile picture is required.' }
    ],
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
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'hospital': [
      { type: 'required', message: 'Hospital is required.' }
    ],
    'job': [
      { type: 'required', message: 'Job is required.' }
    ]
  };
}
