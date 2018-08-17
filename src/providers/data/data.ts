import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { User, Auth } from '../../types';

//import { AlertController } from 'ionic-angular';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  private db: SQLiteObject;

  constructor(public sqlite: SQLite, private storage: Storage) {
    //this.getData();
    console.log("hey")
  }

  public getData(): void {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'

    })
    .then((db: SQLiteObject) => {
        this.db = db;
        this.db.executeSql(
          "CREATE TABLE uers (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,Firstname TEXT NOT NULL,Password TEXT NOT NULL,Email NUMERIC NOT NULL,Country INTEGER NOT NULL,Hospital INTEGER,Phone INTEGER NOT NULL UNIQUE);")
        .then((data) => {
          console.log(data)
        })
        .catch(e => {
          console.log(e)
        })
        console.log(this.db);
      });
   }

   public saveProfile(auth: Auth): void {
     const profile = auth as User;
     // save profile
     this.storage.set('profile', JSON.stringify(profile));
     // save auth token
     this.storage.set('authorization', auth.token);
   }

   public getProfile(): Promise<Auth> {
     return Promise.all([this.storage.get('authorization'), this.storage.get('profile')]).then((res: Array<any>) => {
       if (res[0]) {
         const profile: object = JSON.parse(res[1]);
         if (profile) {
           return new Auth(res[0], res[1]);
         } else {
           return new Auth(res[0], null);
         }
       } else {
         return null
       }
     }).catch((e: any) => {
       console.info(e)
       return null;
     })
   }

   public clearProfile() {
     this.storage.set('profile', null)
     this.storage.set('authorization', null)
   }
    /* Recupere le nombre de vote */
   /*  */
}


/*
  this.db.executeSql(, {})
  )*/







/*
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
})
      .catch(e => console.log(e));
*/

/*
  private createTable(): void {

  }
*/
