import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterOneOfThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-one-of-three',
  templateUrl: 'register-one-of-three.html',
})
export class RegisterOneOfThreePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterOneOfThreePage');
  }

  /*Methods for the html dom modification */
  openMenu(){
    document.getElementById('qualificationInputMenu').style.bottom = '0';
  }

  closeMenu(){
    document.getElementById('qualificationInputMenu').style.bottom = '-100vh';
  }
  
  selectQualification(qualification){
    document.getElementById('qualificationInput').innerHTML = qualification;
    this.closeMenu();
  }

  specifyQualification(){
    alert('test');
  }
}
