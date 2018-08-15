import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

import { AlertController } from 'ionic-angular';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  private db: SQLiteObject;

  constructor(public sqlite: SQLite,private alertCtrl: AlertController) {
    this.getData();
  }

  getData(): void {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return this.db = db;

      /*  alert("salut");
        let alert = this.alertCtrl.create({
          title: 'salut',
          subTitle: '10% of battery remaining',
          buttons: ['Dismiss']
        });
        alert.present();*/
      })
      .then(data => {
        alert(data);
      })
      .catch(e => console.log(e));
  }

}
