import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ModalController} from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { ContestSubmitPage } from '../contest-submit/contest-submit';
import { LoginPage } from '../login/login';
import { DataProvider } from '../../providers/data/data';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { ModalLogout } from '../modal-logout/modal-logout';
/*import { FileTransfer } from '@ionic-native/file-transfer';*/

/**
 * Generated class for the BestUltrasoundImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-best-ultrasound-image',
  templateUrl: 'best-ultrasound-image.html',
})
export class BestUltrasoundImagePage {
  public passParam: any;
  public pdfSrc :string = "watog_contest_consent.pdf"

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, private document: DocumentViewer, public platform: Platform, private file: File, private fileOpener: FileOpener, public modalCtrl: ModalController) {
    this.passParam = this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestUltrasoundImagePage');
  }

  readLocalPdf(){
    const options: DocumentViewerOptions = {
      title: 'My PDF',
      openWith: { enabled: true }
    }

    const filePath = this.file.applicationDirectory + 'www/assets/docs/watog_contest_consent.pdf'
    this.document.viewDocument(filePath, 'application/pdf', options);
  }
  private onShow(){
    window.console.log('Exibir documento.');
//e.g 9. track document usage
  }

  private onClose(){
    window.console.log('Fechar documento');
//e.g 9. remove temp files
  }

  private onMissingApp(appId, installer) {
    if (confirm("Você quer instalar o app grátis PDF Viewer " + appId + " para Android?")) { installer(); }
  }

  private onError(error) {
    window.console.log(error);
    alert("Erro ao brir pdf.");
  }

  /**

   Convert a base64 string in a Blob according to the data and contentType.
   @param b64Data {String} Pure base64 string without contentType
   @param contentType {String} the content type of the file i.e (application/pdf - text/plain)
   @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript 34
   @return Blob
   */
  public b64toBlob(b64Data, contentType) : Blob {
    contentType = contentType || '';
    let sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
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

  goToContestSubmit(){
    this.navCtrl.push(ContestSubmitPage, { id: this.passParam.id , from: this.passParam.from });
  }

  goBack(){
    this.navCtrl.pop();
  }

  goNext(){
    var consent = <HTMLInputElement> document.getElementById("consentCertified");
    if(consent.checked == true){
      this.goToContestSubmit();
    } else {
      document.getElementById("certifyConsent").style.backgroundColor = "#e40046";
    }
  }

  logout(){
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
  }

}
