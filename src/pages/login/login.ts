import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Keyboard } from "@ionic-native/keyboard";

/** Page **/
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { LandingPage } from '../landing/landing';
import { DashboardPage } from '../dashboard/dashboard';

/** Provider **/
import { DataProvider, RestProvider } from '../../providers';
import { User, Auth } from '../../types';
import {RegisterTwoOfThreePage} from "../register-two-of-three/register-two-of-three";
import {RegisterThreeOfThreePage} from "../register-three-of-three/register-three-of-three";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public any: object;

  public data = {
    email: '',
    password: '',
    error: null
  }

//public restProvider: RestProvider, public dataProvider: DataProvider, public http: HttpClient

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public dataProvider: DataProvider, public platform: Platform, public keyboard: Keyboard, public loadingCtrl: LoadingController) {
    //this.data.getData();
    platform.ready().then(() => {
      keyboard.disableScroll(true);
    });
  }

  navigateToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage);
    //console.log(this.data)
  }

  navigateToLanding(){
    this.navCtrl.push(LandingPage);

  }

  invalidate() {
    this.data.error = null;
  }

  onSubmit() {
    //console.log('Login Form Data:', this.data)
    const { email, password } = this.data;
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    if (email && password) {
      this.restProvider.login(email, password).then((auth: Auth) => {
        // Save profil
        console.log('auth',auth);
        this.dataProvider.saveProfile(auth)
        if (auth.proof_of_status) {
          if (!auth.sms_verified_date && !auth.email_verified_date) { // Email or cell_phone is not verified
            loader.dismiss();
            this.navCtrl.push(RegisterThreeOfThreePage); // proof_of_status not uploaded
          } else {
            loader.dismiss();
            this.navCtrl.push(DashboardPage)
          }
        } else {
          loader.dismiss();
          this.navCtrl.push(RegisterTwoOfThreePage)
        }
      }).catch((error) => {
        loader.dismiss();
        this.data.error = 'Invalid email or password';
      })
    } else {
      loader.dismiss();
      this.data.error = 'Please enter email and password'
    }
  }

  ionViewDidLoad() {
    this.dataProvider.getProfile().then((profile: Auth) => {
      if (profile) {
        this.navCtrl.push(DashboardPage)
      }
    })
  }

}
