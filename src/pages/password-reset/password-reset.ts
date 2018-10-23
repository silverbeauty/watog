import { Component , ViewChild} from '@angular/core';
import { Content, IonicPage, NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ForgottenPasswordPage } from '../forgotten-password/forgotten-password';
import { RestProvider } from '../../providers';
import { Keyboard } from '@ionic-native/keyboard';
/**
 * Generated class for the PasswordResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {
  @ViewChild(Content) content: Content;
  public any: object;

  public data = {
    email: '',
    token: '',
    new_password: '',
    passwd_conf: '',
    error: null
  }

  goBack(){
    this.navCtrl.pop();
  }

  invalidate() {
    this.data.error = null;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public restProvider: RestProvider, public alertCtrl: AlertController,public platform: Platform,
    public keyboard: Keyboard) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
    this.data.email = this.navParams.data.email;
  }

  goLogin(){
    this.navCtrl.push(LoginPage);
  }

  goForgotPasswd(){
    this.navCtrl.push(ForgottenPasswordPage);
  }

  showAlert(){
    const alert = this.alertCtrl.create({
      title: 'password reset successfull',
      subTitle: '',
      buttons: ['OK']
    });
  }
  
  ionViewDidEnter(){
    let platform = this.platform
    let keyboard = this.keyboard
    const self = this
    platform.ready().then(() => {
     if (platform.is('ios')) {
        
        let appEl = <HTMLElement> (document.getElementById("resetboard").getElementsByClassName("scroll-content")[0]);
        keyboard.disableScroll(true);
        
        window.addEventListener('native.keyboardshow', (e) => {
          keyboard.disableScroll(true);
          appEl.style.bottom = (<any>e).keyboardHeight + 'px'
          
          if (self.content && self.content.scrollToBottom) {
           self.content.scrollToBottom();
          }
        });

        window.addEventListener('native.keyboardhide', () => {
          appEl.style.bottom = '0px';
        });
      }
    });
  }

  onSubmit(){
    const token = this.data.token;
    const password = this.data.new_password;
    const email = this.data.email;
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    
    if(token && password){
      if((this.data.new_password === this.data.passwd_conf) && (this.data.passwd_conf.length >= 5)){
        this.restProvider.resetPasswordFromToken(token, password, email).then(() => {
          loader.dismiss();
          this.showAlert();
          this.navCtrl.push(LoginPage);
        }).catch((error) => {
          loader.dismiss();
          console.log(error);
          this.data.error = 'invalid token';
        })
      } else {
        loader.dismiss();
        this.data.error = "Passwords don't match OR too short (min length: 5)";
      }
    } else {
      loader.dismiss();
      this.data.error = 'Please enter Token AND Password';
    }
  }

}
