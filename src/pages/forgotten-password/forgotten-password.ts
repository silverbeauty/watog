import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PasswordResetPage } from '../password-reset/password-reset';

/**
 * Generated class for the ForgottenPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotten-password',
  templateUrl: 'forgotten-password.html',
})
export class ForgottenPasswordPage {

  public any: object;

  public data = {
    email: '',
    error: null
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgottenPasswordPage');
  }

  goBack(){
    this.navCtrl.pop();
  }

  invalidate() {
    this.data.error = null;
  }

  onSubmit(){
    const  { email } = this.data;
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    if(email){
      this.navCtrl.push(PasswordResetPage);
      loader.dismiss();
    } else {
      loader.dismiss();
      this.data.error = 'Please enter email !'
    }
  }
}
