import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-report-modal',
  templateUrl: 'report-modal.html',
})
export class ReportModalPage {

  constructor(public viewCtrl: ViewController, 
    public navCtrl: NavController, 
    public renderer : Renderer,
    public navParams: NavParams) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportModalPage');
  }
  close(){
    this.viewCtrl.dismiss();
  }
  done(){
    this.viewCtrl.dismiss();
  }
}
