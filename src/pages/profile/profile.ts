import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ModalController, ViewController} from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { SettingsPage } from '../settings/settings';
import { DataProvider, RestProvider } from '../../providers';
import { User, Auth } from '../../types';
import { LoginPage } from '../login/login';
import { ProfilesLoadPage } from '../profiles-load/profiles-load';
import { BestPhotoPage } from '../best-photo/best-photo'


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public auth: Auth
  public vote: any;
  public description: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public dataProvider: DataProvider, public restProvider: RestProvider, public modalCtrl: ModalController) {
    this.auth = DataProvider.auth
    console.log(this.auth)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    // Load local profile
    this.auth = DataProvider.auth;
    if (!this.auth.picture_profile) {
      // Load profile by API
      this.auth.picture_profile = 'assets/icon/Profil.png';
    }
    this.restProvider.getProfile().then( (auth: Auth) => {
      this.auth = auth;
      if (!this.auth.picture_profile) {
        this.auth.picture_profile = 'assets/icon/Profil.png';
      }
      this.dataProvider.saveProfile(auth);
    }).catch(err => {
      console.error(err)
    })
  }

  reported(img){
    let alert = this.alertCtrl.create({
      title: 'Spam',
      subTitle: 'Dou you really want report this picture ?',
      buttons: [
        { text: 'Spam', handler: () =>{
          this.vote.type = 'spam'
        }},
        { text: 'violence', handler: () => {
          this.vote.type = 'violence'
        }},
        { text: 'sex', handler: () => {
          this.vote.type = 'sex'
        }},
        { text: 'other', handler: () => {
          this.vote.type = 'other'
        }}]
    });
    alert.present();
    console.log(this.vote)
    this.vote.description = this.description;
    this.Voted(img.id)
  }

  voteUp(img){
    this.vote.commend = true;
    this.Voted(img.id)
  }

  voteDown(img){
    this.vote.commend = false;
    this.Voted(img.id)
  }

  Voted(id: number){
    console.log("vote: ", this.vote)
    this.restProvider.votePost(id, this.vote.commend).then(data => {
      console.info('Voted:', data)
    }).catch( err => {
      console.error('Failed to vote:', err)
    })
  }

  goToBestPhoto(i){
    console.log(i)
    const selected: number = i;
    this.navCtrl.push(BestPhotoPage, { "selected": selected});
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  logout(){
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }
}
@Component({template:
  ' <div class="dialog" tabindex="-1" role="dialog">\n' +
  '    <div class="modal-dialog modal-dialog-centered" role="document">\n' +
  '      <div class="modal-content">\n' +
  '        <div class="modal-header">\n' +
  '          <h5 class="modal-title ">Confirm logout</h5>\n' +
  '          <button id="btn-modal-close" type="button" class="close hide" data-dismiss="modal" aria-label="Close">\n' +
  '            <span aria-hidden="true">&times;</span>\n' +
  '          </button>\n' +
  '        </div>\n' +
  '        <div class="modal-body p-4">\n' +
  '          <p>Are you sure to want to disconnect?</p>\n' +
  '        </div>\n' +
  '        <div class="modal-footer">\n' +
  '          <button ion-button round color="light" class="text-uppercase mr-3" (click)="dismiss()">Cancel</button>\n' +
  '          <button ion-button round color="teal" class="text-uppercase" (click)="logout()">OK</button>\n' +
  '        </div>\n' +
  '      </div>\n' +
  '    </div>\n' +
  '  </div>'})
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
}
