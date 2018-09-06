import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnterTokenPage } from '../enter-token/enter-token';
import { DataProvider, RestProvider} from "../../providers";
import {Auth, ObjUser} from "../../types";
import {RegisterTwoOfThreePage} from "../register-two-of-three/register-two-of-three";

/**
 * Generated class for the RegisterThreeOfThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-three-of-three',
  templateUrl: 'register-three-of-three.html',
})
export class RegisterThreeOfThreePage {

  public url_verify: string = 'sms';
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider : RestProvider, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterThreeOfThreePage');
  }

  goBack(){
    this.navCtrl.pop();
  }

  goToEnterToken(){
    const url_verify = this.url_verify;
    this.restProvider.sendVerifyRequest( url_verify).then((data) => {
      alert(data);
      this.navCtrl.push(EnterTokenPage, { url_verify: url_verify});
    }).catch((error) => {
      alert(error);
    })
  }

}
