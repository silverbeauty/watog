import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Country } from "../../types";
import { countries } from '../../models/model';

@IonicPage()
@Component({
  selector: 'page-room-create',
  templateUrl: 'room-create.html',
})
export class RoomCreatePage {
  
  validations_form: FormGroup;
  public countries: Country[];
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.countries = [
      new Country(countries[0].code, countries[0].name)
    ]
    for (var i = 1; i < countries.length; i++) {
      const County = new Country(countries[i].code, countries[i].name)
      this.countries.push(County);
    }
  }

  ionViewWillLoad(){
    let country = new FormControl(this.countries[0], Validators.required);
    this.validations_form = this.formBuilder.group({
      country: country,
      topics : country,
      invoiceLevel : country
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomCreatePage');
  }

  goBack() {
    this.navCtrl.pop();
  }
}
