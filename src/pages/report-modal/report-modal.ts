import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, LoadingController } from 'ionic-angular';

import { ChatService } from "../../providers/";

@IonicPage()
@Component({
  selector: 'page-report-modal',
  templateUrl: 'report-modal.html',
})
export class ReportModalPage {
  reportList : any = [];
  selectedReport : any = [];
  room_id: any ;
  constructor(public viewCtrl: ViewController, 
    public navCtrl: NavController, 
    public renderer : Renderer,
    private chatService: ChatService,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
      this.room_id = navParams.get("room_id");
      this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
      this.reportList = [
        {"id" : 1, "name" : "Violence"},
        {"id" : 2, "name" : "Harassment"},
        {"id" : 3, "name" : "Spam"},
        {"id" : 4, "name" : "Hate"},
        {"id" : 5, "name" : "Nudity"},
        {"id" : 6, "name" : "Other"},
      ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportModalPage');
  }
  close(){
    this.viewCtrl.dismiss();
  }
  report (report){
    this.selectedReport = report;
  }

  done(){
    let self = this
    let params = {};
    params["type"] = this.selectedReport;
    // params["description"] = "";

    const loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();

    this.chatService.reportRoom(this.room_id, params).then((data)=>{
      loader.dismiss();
      self.viewCtrl.dismiss(self.selectedReport);
    }).catch(err => {
      loader.dismiss();
      console.log("err", err)
    })
    
  }
}
