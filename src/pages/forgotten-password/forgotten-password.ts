import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PasswordResetPage } from '../password-reset/password-reset';
import { RestProvider } from '../../providers';
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public restProvider: RestProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgottenPasswordPage');
  }

  goBack(){
    this.navCtrl.push(LoginPage);
  }

  invalidate() {
    this.data.error = null;
  }

  showAlert(email){
    const alert = this.alertCtrl.create({
      title: 'We sent a password reset token to : ',
      subTitle: email,
      buttons: ['OK']
    });

    alert.present();
  }

  onSubmit(){
    const  { email } = this.data;
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    if(email){
      this.restProvider.forgotPassword(email).then(() => {
        loader.dismiss();
        this.showAlert(this.data.email);
        this.navCtrl.push(PasswordResetPage, {email: this.data.email});
      }).catch((error) => {
        loader.dismiss();
        this.data.error = 'Invalid email';
      })
    } else {
      loader.dismiss();
      this.data.error = 'Please enter email !'
    }
  }
}
