import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnterTokenPage');
  }

  goBack(){
    this.navCtrl.pop();
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

}
