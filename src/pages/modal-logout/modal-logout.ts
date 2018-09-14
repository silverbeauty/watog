import { Component } from '@angular/core';
import {IonicPage, NavController, ViewController} from 'ionic-angular';

import { DataProvider } from '../../providers';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-modal-logout',
  templateUrl: 'modal-logout.html',
})

export class ModalLogout {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public dataProvider: DataProvider) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

  cancel() {
    console.log(123)
    this.viewCtrl.dismiss();
  }
}
