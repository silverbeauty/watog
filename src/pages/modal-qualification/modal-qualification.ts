import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-modal-qualification',
  templateUrl: 'modal-qualification.html',
})

export class ModalQualification {

  showInputQualification: boolean = false;
  other_speciality: any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController) {

  }

  dismiss() {
    let data = { other: 'Medical Doctor, Other Speciality' };
    this.viewCtrl.dismiss(data);
  }

  cancel() {
    let data = { other: 'Medical Doctor, Other Speciality' };
    this.viewCtrl.dismiss(data);
  }

  selectQualification(qualification) {
    let data = { other: qualification };
    this.viewCtrl.dismiss(data);
  }

  inputQualification(data) {
    this.showInputQualification = true;
  }

  saveOtherSpeciality() {
    let data = { other: this.other_speciality };
    this.viewCtrl.dismiss(data);
    this.showInputQualification = false;
  }

  cancelOtherSpeciality() {
    this.showInputQualification = false;
  }
}
