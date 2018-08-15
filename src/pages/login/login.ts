import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';

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

  todo = {
    user: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  navigateToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
