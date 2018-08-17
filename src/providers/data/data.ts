import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { User, Auth } from '../../types';

const my_database = 'data.db';

@Injectable()
export class DataProvider {

  private db: SQLiteObject;
  private Firstname: string;
  private Password: string;
  private Email: string;
  private Country: string;
  private Hospital: string;
  private Phone: number;
  private arr: any;

  constructor(public sqlite: SQLite, private storage: Storage) {
    //this.InstanceData();
    //this.create(this.any, "james")
  }
  
  /** CODE IN DEVELLOPMENT CORDOVA FULL REQUIERMENT PLEASE DON'T TOUCH IF YOU DON'T KNOW WHAT YOU ARE DOING **/

    /** Local user Database **/
/*
   private InstanceData(): void {
    this.sqlite.create({
      name: my_database,
      location: 'default'
    })
    .then((db: SQLiteObject) => {
        console.log('bdd create');
        this.db = db;
        this.db.executeSql(
          "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,Firstname TEXT NOT NULL,Password TEXT NOT NULL,Email TEXT NOT NULL,Country INTEGER NOT NULL,Hospital INTEGER,Phone INTEGER NOT NULL UNIQUE,FOREIGN KEY(photo_id) REFERENCES photo(id));"
        )
        .then((data) => {
          console.log("command sucess");
          this.db.executeSql(
            "CREATE TABLE IF NOT EXISTS photo (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,Name TEXT NOT NULL)"
          )
        })
        .catch(e => {
          console.log(e)
        })
      });
    }
   
    create(task: any, fn: string){
      this.Firstname = fn;
      let sql = `INSERT INTO user(Firstname) VALUES(${ this.Firstname })`;
      console.log(this.Firstname);
      return this.db.executeSql(sql, [task.title, task.completed]);
    }
	
    getAll(){
       let sql = 'SELECT * FROM user';
       return this.db.executeSql(sql, [])
         .then(response => {
           let tasks = [];
           for (let index = 0; index < response.rows.length; index++) {
             tasks.push( response.rows.item(index) );
           }
           console.log(tasks);
           return Promise.resolve( tasks );
         })
         .catch(error => Promise.reject(error));
    }
*/

   /** Structure  **/
/*
   public saveProfile(auth: Auth): void {
     const profile = auth as User;
     this.storage.set('profile', JSON.stringify(profile));
     this.storage.set('authorization', auth.token);
   }



    update(task: any){
      let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
      return this.db.executeSql(sql, [task.title, task.completed, task.id]);
    }

    delete(task: any){
      let sql = 'DELETE FROM tasks WHERE id=?';
      return this.db.executeSql(sql, [task.id]);
    }

   searchInDb() {
     //this.db.executeSql("")
     this.user = "toma";
     console.log(this.user);
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
 */
}