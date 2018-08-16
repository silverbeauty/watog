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
    password: ''
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

  logForm() {
    console.log('Login Form Data:', this.data)
    this.restProvider.login(this.data).then((resp) => {
      this.navCtrl.push(DashboardPage)
    }).catch((error) => {

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
