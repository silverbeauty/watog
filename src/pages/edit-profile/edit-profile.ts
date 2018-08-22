import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { RegisterTwoOfThreePage } from '../register-two-of-three/register-two-of-three';
import { countries } from '../../models/model';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { server_url } from '../../environments/environment'
import { DataProvider } from '../../providers';


/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  public todo = {
    first_name: "",
    last_name: "",
    password: "",
    pass_conf: "",
    email: "",
    cell_phone: null,
    country: "",
    hospital:"",
    other_speciality: ""
  }

  public promise : any;
  countries : any[] = countries;
  server_url: any = server_url;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public profil: DataProvider) {
    this.promise = Promise.all([this.profil.get()]);
    this.promise.then(res => {
      return JSON.parse(res);
    })
    .then(data => {
      this.todo.password = data.password;
      this.todo.pass_conf = data.password;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  goBack(){
    this.navCtrl.pop();
  }

  logForm(){

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    try{
      this.http.post(this.server_url+'/users/me', JSON.stringify(this.todo), {headers: httpHeaders}).subscribe(data => {
        console.log(data);
        if((typeof data) == "object"){
          if(status == "true"){
            alert('true');
          }else{
            alert('false');
          }
        }
        else{
          console.log("data is not define");
        }
      })
    } catch (e){console.log("http.post returned :" + e);}

  }

  logout(){
    console.log('not implemented yet');
  }

}
