import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-credits',
  templateUrl: 'credits.html',
})
export class CreditsPage {
  lists: any=[]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lists =[
      {
        "name" : "Olivier Ami",
        "position" : "Director",
        "avatar" : "",
      },
      {
        "name" : "Samy Chouial",
        "position" : "Manager",
        "avatar" : "",
      },
      {
        "name" : "Jean-Christophe Maran",
        "position" : "CTO",
        "avatar" : "",
      },
      {
        "name" : "Anais Guinet",
        "position" : "Chief Design Officer",
        "avatar" : "",
      },
      {
        "name" : "Zulqairnain Ansari",
        "position" : "UX designer",
        "avatar" : "",
      },
      {
        "name" : "Théo Duvernay",
        "position" : "User interface designer",
        "avatar" : "",
      },
      {
        "name" : "Taddeo Capdeboscq",
        "position" : "Data scientist",
        "avatar" : "",
      },
      {
        "name" : "Valeri Tsertvasde",
        "position" : "Dev team leader",
        "avatar" : "",
      },
      {
        "name" : "Emmario Delar",
        "position" : "Backend developer",
        "avatar" : "",
      },
      {
        "name" : "Andrei Glingeanu",
        "position" : "Backend developer",
        "avatar" : "",
      },
      {
        "name" : "Nathanaelle Glatigny",
        "position" : "Realisator",
        "avatar" : "",
      },
      {
        "name" : "Matthew Klynsmith",
        "position" : "Front end developper",
        "avatar" : "",
      },
      {
        "name" : "David Nash",
        "position" : "Front end developper",
        "avatar" : "",
      },
      {
        "name" : "Ion Enache",
        "position" : "Front end developper",
        "avatar" : "",
      },
      {
        "name" : "Gregory Gueudin",
        "position" : "Legal counselor",
        "avatar" : "",
      },
      {
        "name" : "Béatrice Degand",
        "position" : "Assistant",
        "avatar" : "",
      },
    ]
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditsPage');
  }

}
