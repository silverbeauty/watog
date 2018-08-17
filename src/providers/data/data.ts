import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

//import { AlertController } from 'ionic-angular';

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

  constructor(public sqlite: SQLite) {
    //this.InstanceData();
    //this.create(this.any, "james")
  }
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
     }*/
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
}
