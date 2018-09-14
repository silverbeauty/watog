import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { RegisterTwoOfThreePage } from '../register-two-of-three/register-two-of-three';
import { countries } from '../../models/model';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { server_url } from '../../environments/environment';
import {DataProvider, PasswordValidator, PhoneValidator, RestProvider} from '../../providers';
import { ElementRef } from '@angular/core';
import {LoginPage} from "../login/login";
import {Auth, Country, User} from "../../types";
import { UploadCoverPhotoPage } from "../upload-cover-photo/upload-cover-photo";
import {FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ModalLogout } from '../modal-logout/modal-logout';
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
    proof_of_status_date: '',
    proof_of_status: ''
  }

  public image = {
    image_url: '',
    profile_selected: false
  }

  public profile_image: string = "assets/imgs/rio.jpg";
  public promise : any;
  countries: Country[];
  public country: Country = new Country("FR", "");;
  validations_form: FormGroup;
  country_phone_group: FormGroup;

  constructor( public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public restProvider : RestProvider, public dataProvider: DataProvider, public modalCtrl: ModalController) {
    const params = this.navParams.data;
    if(params.image_url) {
      this.image = params;
      this.profile_image = this.image.image_url;
      this.user.picture_profile = this.image.image_url;
    }
    this.dataProvider.getProfile().then((profile: User) => {
      this.user = profile as User;
      console.log(this.user);
      this.countries = [
        new Country(countries[0].code, countries[0].name)
      ]
      if(this.countries[0].name == this.user.country){
        this.country = this.countries[0];
      }
      for(var i = 1; i < countries.length; i ++){
        const County = new Country(countries[i].code, countries[i].name);
        this.countries.push(County);
        if(countries[i].name == this.user.country){
          this.country = this.countries[i];
        }
      }
    })
  }

  ionViewDidLoad() {
    this.dataProvider.getProfile().then((profile: User) => {
      this.user = profile;
      console.log(this.user)
    })
  }

  ionViewWillLoad() {
    let country = new FormControl('', Validators.required);
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
      country_phone: this.country_phone_group,
      hospital: ['', Validators.compose([
        Validators.required
      ])]
    });
  }
  setCurrentUser() {
    if(this.user.cell_phone.lastIndexOf('_') != -1) {
      this.user.cell_phone = (this.user.cell_phone.slice(0, -1))
    }
    this.user.country = this.country.name;
    this.user.first_name = this.validations_form.value.first_name;
    this.user.last_name = this.validations_form.value.last_name;
    this.user.user_name = this.validations_form.value.user_name;
    this.user.hospital = this.validations_form.value.hospital;
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
    this.navCtrl.push(UploadCoverPhotoPage);
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
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
  }

  checkFocus(){
    if(this.user.cell_phone.lastIndexOf('_') != -1){
      this.user.cell_phone = (this.user.cell_phone.slice(0, -1))
    }
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
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
    ],
    'hospital': [
      { type: 'required', message: 'Hospital is required.' }
    ]
  };

}
