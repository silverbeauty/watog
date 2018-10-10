import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { VideosListPage } from '../videos-list/videos-list';

/**
 * Generated class for the LearnContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-learn-content',
  templateUrl: 'learn-content.html',
})

export class LearnContentPage {
  value: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const data = navParams.get('item');
    let _temp : any =[]
    data.list.forEach(element => {
      let _element: any={};
      _element["name"] = element.name
      _element["videos"] = element.videos
      switch (element.name){
        case "WATOG":
          _element["logo"] = "../../assets/logos/WATOG.jpg"
          break;
        case "FIGO":
          _element["logo"] = "../../assets/logos/figo.png"
          break;
        case "ACOG":
          _element["logo"] = "../../assets/logos/ACOG.png"
          break;
        case "SOGC":
          _element["logo"] = "../../assets/logos/SOGC.jpg"
          break;
        case "EBCOG":
          _element["logo"] = "../../assets/logos/EBCOG.png"
          break;
        case "RANZCOG":
          _element["logo"] = "../../assets/logos/RANZCOG.jpg"
          break;
        case "FLASOG":
          _element["logo"] = "../../assets/logos/FLASOG.png"
          break;
        case "CCD":
          _element["logo"] = "../../assets/logos/LABORATOIRE.jpg"
          break;
        case "BABY PROGRESS":
          _element["logo"] = "../../assets/logos/BABY.jpg"
          break;
        case "Qwant Care":
          _element["logo"] = "../../assets/logos/QWANT.png"
          break;
        case "FOGSI":
          _element["logo"] = "../../assets/logos/FOGSI.png"
          break;
        case "COGA":
          _element["logo"] = "../../assets/logos/COGA.jpg"
          break;
      }
      _temp.push(_element);      
    });
    data.list = _temp;
    this.value = data;
    console.log("temp ", _temp);
    // const qwantCare = {
    //   name: 'Qwant Care',
    //   videos: this.value.list[0].videos
    // }
    // this.value.list.push(qwantCare);
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToVideosListPage(event, N, Nname) {
    console.log(N, Nname)
    this.navCtrl.push(VideosListPage, {
      N: N,
      Nname: Nname
    });
  }

}
