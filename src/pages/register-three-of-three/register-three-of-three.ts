import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnterTokenPage } from '../enter-token/enter-token';
import { DataProvider, RestProvider} from "../../providers";
import {Auth} from "../../types";

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

  public url_verify: string = 'email';
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider : RestProvider, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterThreeOfThreePage');
  }

  goBack(){
    this.navCtrl.pop();
  }

  goToEnterToken(){
    this.dataProvider.getProfile().then((profile: Auth) => {
      if(this.url_verify == 'email'){
        const sel_verify = profile.email;
        return sel_verify;
      }else{
        const sel_verify = profile.cell_phone;
      }).then((data){

      }
  }).catch()
    this.navCtrl.push(EnterTokenPage, {url_verify: this.url_verify, sel_verify: });
  }

}
