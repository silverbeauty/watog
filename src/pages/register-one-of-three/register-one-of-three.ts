import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';

import { countries } from '../../models/model';
import { LoginPage } from '../login/login';
import { UploadCoverPhotoPage } from '../upload-cover-photo/upload-cover-photo';
import { UploadProfilePhotoPage } from '../upload-profile-photo/upload-profile-photo';
import { RegisterTwoOfThreePage } from '../register-two-of-three/register-two-of-three';
import { ModalQualification } from '../modal-qualification/modal-qualification';
import { DashboardPage } from "../dashboard/dashboard";
import { Auth, ObjUser, Country } from "../../types";
import { DataProvider, RestProvider, PhoneValidator, PasswordValidator } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-register-one-of-three',
  templateUrl: 'register-one-of-three.html',
  queries: {
    content: new ViewChild('content')
  }
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

  public other_speciality: string;

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;


  public countries: Country[];
  public profile_selected: boolean = false;
  public profile_image: string = "assets/imgs/rio.jpg";
  public country: Country = null;
  public promise: any;
  public pass_conf: string = "";
  public show: boolean = false;
  public agree: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public formBuilder: FormBuilder, public restProvider: RestProvider, public dataProvider: DataProvider, public modalCtrl: ModalController) {
    const params = this.navParams.data;
    if (params.image_url) {
      this.image = params;
      this.profile_image = this.image.image_url;
      this.user.picture_profile = this.image.image_url;
      this.profile_selected = this.image.profile_selected;
      this.promise = Promise.all([this.dataProvider.getObjUser()]);
      this.promise.then(res => {
        let data = JSON.parse(res);
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
      }).catch(err => {
        console.log(err)
      })
    }

    this.countries = [
      new Country(countries[0].code, countries[0].name)
    ]
    for (var i = 1; i < countries.length; i++) {
      const County = new Country(countries[i].code, countries[i].name)
      this.countries.push(County);
    }
    this.country = this.countries[71];
  }

  ionViewWillLoad() {
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
      user_name: ['', Validators.compose([
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
      hospital: [''],
      job: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  checkFocus() {
    if (this.user.cell_phone.lastIndexOf('_') != -1) {
      this.user.cell_phone = (this.user.cell_phone.slice(0, -1))
    }
  }

  goToTerms() {
    console.info('goToTerms')
  }

  /** Request Http **/

  register() {
    if (!this.agree) {
      this.content.scrollToBottom(300);
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'You need to agree with WATOG Terms and Conditions.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    if (this.user.cell_phone.lastIndexOf('_') != -1) {
      this.user.cell_phone = (this.user.cell_phone.slice(0, -1))
    }
    this.user.country = this.country.name;
    /*if(this.profile_selected != true){
      this.dataProvider.saveObjUser(this.user as ObjUser);
      alert("You have to choose profile picture!");
      this.navCtrl.push(UploadProfilePhotoPage);
    }*/
    this.restProvider.signUp(this.user as ObjUser).then((user: ObjUser) => {
      // Save Profile
      //this.dataProvider.saveProfile(auth);
      //this.navCtrl.push(RegisterTwoOfThreePage);
      const email = user.email;
      const password = this.user.password;
      return { email, password }
    }).then((data) => {
      this.restProvider.login(data.email, data.password).then((auth: Auth) => {
        // Save Profile
        this.dataProvider.saveProfile(auth);
        this.navCtrl.push(RegisterTwoOfThreePage);
      }).catch((error) => {
        alert(error)
      })
    }).catch((error) => {
      alert(error);
    })
  }

  /** Navigation **/
  isShow() {
    return this.show;
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  navToUploadProfilePhoto() {
    this.user.country = this.country.name;
    this.dataProvider.saveObjUser(this.user as ObjUser);
    this.navCtrl.push(UploadProfilePhotoPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterOneOfThreePage');
    this.user.picture_profile = this.profile_image;
    this.user.country = "France";
    this.country = new Country("MH", "");
    this.show = false;
  }

  /*Methods for the html dom modification */
  openQualificationModal() {
    let profileModal = this.modalCtrl.create(ModalQualification);
    profileModal.onDidDismiss(data => {
      this.user.job = data.other;
    });
    profileModal.present();
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
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'hospital': [],
    'job': [
      { type: 'required', message: 'Job is required.' }
    ]
  };
}
