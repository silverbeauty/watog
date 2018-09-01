import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnterTokenPage } from '../enter-token/enter-token';

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

  public sel_verific: string = 'email'
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterThreeOfThreePage');
  }

  goBack(){
    this.navCtrl.pop();
  }

  goToEnterToken(){
    this.navCtrl.push(EnterTokenPage, {verify: this.sel_verific});
  }

}
