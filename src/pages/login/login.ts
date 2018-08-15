import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { LandingPage } from '../landing/landing';

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

  public todo = {
    user: "",
    pass: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage)
  }

  navigateToLanding(){
    this.navCtrl.push(LandingPage)
  }

  logForm() {
    console.log(this.todo)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
