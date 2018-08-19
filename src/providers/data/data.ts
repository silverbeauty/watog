//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';
import { Injectable } from '@angular/core';

import { User, Auth } from '../../types';

const my_database = 'data.db';

@Injectable()
export class DataProvider {

  //private db: SQLiteObject;
  private Firstname: string;
  private Password: string;
  private Email: string;
  private Country: string;
  private Hospital: string;
  private Phone: number;
  private arr: any;

  //public sqlite: SQLite, private storage: Storage

  constructor(private storage: NativeStorage) {}


  public saveProfile(auth: Auth): void {
    const profile = auth as User;
    this.storage.setItem('profile', JSON.stringify(profile));
    this.storage.setItem('authorization', auth.token);
  }

  public getProfile(): Promise<Auth> {
    return Promise.all([this.storage.getItem('authorization'), this.storage.getItem('profile')]).then((res: Array<any>) => {
      if (res[0]) {
        const profile: object = JSON.parse(res[1]);
        if (profile) {
          const auth: Auth = profile as Auth;
          auth.token = res[0];
          return auth
        } else {
          const auth = new Auth()
          auth.token = res[0];
          return auth;
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
    this.storage.setItem('profile', null)
    this.storage.setItem('authorization', null)
  }

  /*** SIMPLE GET AND SET ***/

  get(){
    return this.storage.getItem('profile');
  }

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

*/
