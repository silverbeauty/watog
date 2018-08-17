import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'

/** Page **/
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { LandingPage } from '../landing/landing';

/** Provider **/
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public data: DataProvider;
  public any: object;

  public todo = {
    user: "",
    pass: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage);
    //console.log(this.data)
  }

  navigateToLanding(){
    this.navCtrl.push(LandingPage);

  }

  logForm() {
    console.log(this.todo)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log("register");
  }

}
