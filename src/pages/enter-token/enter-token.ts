import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { RegisterThreeOfThreePage } from '../register-three-of-three/register-three-of-three';
import {DataProvider, RestProvider} from "../../providers";
import {User} from "../../types";

/**
 * Generated class for the EnterTokenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enter-token',
  templateUrl: 'enter-token.html',
})
export class EnterTokenPage {
  public url_verify: string = 'email';
  public code_verify: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public dataProvider: DataProvider) {
    const params = this.navParams.data;
    if(params.url_verify){
      this.url_verify = params.url_verify;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnterTokenPage');
  }

  goBack(){
    this.navCtrl.pop();
  }

  goToDashboard(){
    const url_verify = this.url_verify;
    const code_verify = this.code_verify;
    this.restProvider.sendVerifyCode(code_verify, url_verify ).then((user: User) => {
      const profile_user:User = user;
      this.dataProvider.saveUser(profile_user);
      this.navCtrl.push(DashboardPage);
    }).catch((error) => {
      alert(error)
    })
  }

  goBackRegisterConf(){
    this.navCtrl.push(RegisterThreeOfThreePage);
  }
}
