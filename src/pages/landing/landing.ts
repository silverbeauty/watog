import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { RegisterOneOfThreePage } from '../register-one-of-three/register-one-of-three';
import { RegisterTwoOfThreePage } from '../register-two-of-three/register-two-of-three';
import { RegisterThreeOfThreePage } from '../register-three-of-three/register-three-of-three';
import { DashboardPage } from '../dashboard/dashboard';
import { DataProvider, RestProvider } from '../../providers';
import { User, Auth } from '../../types';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
    //console.log(this.data);
    console.info('Rest:', this.dataProvider)

    if (DataProvider.firstRun) {
      DataProvider.firstRun = false;
      this.dataProvider.getProfile().then((auth: Auth) => {
        if (auth) {
          RestProvider.token = auth.token; // Set auth token
          return this.restProvider.getProfile()
        } else {
          throw "No Token In the Storage";
        }
      }).then((auth: Auth) => {
        
        if (auth.proof_of_status) {
          if (!auth.sms_verified_date && !auth.email_verified_date) { // Email or cell_phone is not verified
            // this.navCtrl.push(RegisterThreeOfThreePage); // Goto SMS/Email verify page
            this.navCtrl.push(DashboardPage) // This is for dev
          } else {
            this.navCtrl.push(DashboardPage)
          }
        } else {
          // this.navCtrl.push(RegisterTwoOfThreePage)  // proof_of_status not uploaded
          this.navCtrl.push(DashboardPage)  // proof_of_status not uploaded
          // this.navCtrl.push(RegisterOneOfThreePage)  // proof_of_status not uploaded
        }
      }).catch((e: any) => {
        console.error(e)
        this.dataProvider.clearProfile() // Clear profile and token
        this.navCtrl.push(LoginPage)
      })
    }
  }

  navigateToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
