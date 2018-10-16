import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
  public validation_error_sms: boolean;
  public validation_error_email: boolean;
  public user = {
    email: '',
    cell_phone: ''
  };
  validations_form: FormGroup;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public navParams: NavParams, public restProvider: RestProvider, public dataProvider: DataProvider, public formBuilder: FormBuilder) {
  }

  ionViewWillLoad() {
    this.validations_form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      cell_phone: ['']
    });
  }

  ionViewDidLoad() {
    this.validation_error_sms = false;
    this.validation_error_email = false;
    this.user = JSON.parse(this.dataProvider.get());
    console.log(this.user)
  }

  sendToken() {
    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    let data = {};
    if (this.url_verify === 'sms') {
      if (this.cell_phone.lastIndexOf('_') != -1) {
        this.cell_phone = (this.validations_form.value.cell_phone.slice(0, -1));
        data = {
          cell_phone: this.validations_form.value.cell_phone
        }
      }
    } else {
      data = {
        email: this.validations_form.value.email
      }
    }

    const url_verify = this.url_verify;

    console.log(data);
    this.restProvider.updateUserInfo(data).then((user) => {
      this.restProvider.sendVerifyRequest(url_verify).then((data) => {
        loader.dismiss();
        alert(data);
        this.navCtrl.push(EnterTokenPage, { url_verify: url_verify });
      }).catch((error) => {
        loader.dismiss();
        alert(error);
        if(url_verify === 'sms') {
          this.validation_error_sms = true;
        } else {
          this.validation_error_email = true;
        }
      })
    }).catch((error) => {
      loader.dismiss();
      if(url_verify === 'sms') {
        this.validation_error_sms = true;
      } else {
        this.validation_error_email = true;
      }
    })
  }

  changePhoneNum() {
    this.validation_error_sms = false;
  }

  changeEmail() {
    this.validation_error_email = false;
  }

  logout(){
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
  }

}
