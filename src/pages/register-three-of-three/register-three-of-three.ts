import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { EnterTokenPage } from '../enter-token/enter-token';
import { DataProvider, RestProvider } from '../../providers';
import { Auth, Country, User } from '../../types';
import { RegisterTwoOfThreePage } from '../register-two-of-three/register-two-of-three';
import { ModalLogout } from '../../pages/modal-logout/modal-logout';
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

  public url_verify: string = 'sms';
  public cell_phone: string;
  public validation_error: boolean;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public navParams: NavParams, public restProvider: RestProvider, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.validation_error = false;
    this.cell_phone = this.restProvider.getCellPhone();
    console.log(this.cell_phone)
  }

  goToEnterToken() {
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    if (this.cell_phone.lastIndexOf('_') != -1) {
      this.cell_phone = (this.cell_phone.slice(0, -1))
    }
    const url_verify = this.url_verify;
    const data = {
      cell_phone: this.cell_phone
    }
    console.log(this.cell_phone);
    this.restProvider.updatePhone(data).then((user) => {
      this.restProvider.sendVerifyRequest(url_verify).then((data) => {
        loader.dismiss();
        alert(data);
        this.navCtrl.push(EnterTokenPage, { url_verify: url_verify });
      }).catch((error) => {
        loader.dismiss();
        alert(error);
        this.validation_error = true;
      })
    }).catch((error) => {
      loader.dismiss();
      this.validation_error = true;
    })
  }

  changePhoneNum() {
    this.validation_error = false;
  }

  logout(){
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
  }

}
