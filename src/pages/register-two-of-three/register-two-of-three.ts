import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { RegisterThreeOfThreePage } from '../register-three-of-three/register-three-of-three';

/**
 * Generated class for the RegisterTwoOfThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-two-of-three',
  templateUrl: 'register-two-of-three.html',
})
export class RegisterTwoOfThreePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterTwoOfThreePage');
  }

  goToRegister(){
    this.navCtrl.push(RegisterOneOfThreePage);
  }

  goToRegisterThreeOfThree(){
    this.navCtrl.push(RegisterThreeOfThreePage);
  }

}
