import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IonicPage, NavController, NavParams } from 'ionic-angular'

/** Page **/
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { LandingPage } from '../landing/landing';
import { DashboardPage } from '..//dashboard/dashboard';

/** Provider **/
import { DataProvider } from '../../providers/data/data';
import { RestProvider } from '../../providers/rest/rest';

import { User, Auth } from '../../types';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public data = {
    email: '',
    password: '',
    error: null
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public dataProvider: DataProvider, public http: HttpClient) {
    //this.data.getData();
  }

  navigateToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage)
  }

  navigateToLanding(){
    this.navCtrl.push(LandingPage)
  }

  invalidate() {
    this.data.error = null;
  }

  onSubmit() {
    console.log('Login Form Data:', this.data)

    const { email, password } = this.data;
    if (email && password) {
      this.restProvider.login(email, password).then((auth: Auth) => {
        console.info('Login Response:', auth)
        // Save profil
        this.dataProvider.saveProfile(auth);
        this.navCtrl.push(DashboardPage)
      }).catch((error) => {
        this.data.error = 'Invalid email or password';
      })
    } else {
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
