import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

//import { AlertController } from 'ionic-angular';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  private db: SQLiteObject;

  constructor(public sqlite: SQLite) {
    this.getData();
  }

  public getData(): void {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'

    }).then((db: SQLiteObject) => {
        this.db = db;
        this.db.executeSql(
          "CREATE TABLE uers (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,Firstname TEXT NOT NULL,Password TEXT NOT NULL,Email NUMERIC NOT NULL,Country INTEGER NOT NULL,Hospital INTEGER,Phone INTEGER NOT NULL UNIQUE);")
        .then((data) => {
            alert(data);
        });
      });
   }
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
