import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

const jsonHeader = new HttpHeaders({
  'Content-Type':  'application/json'
});

@Injectable()
export class RestProvider {

  apiUrl = 'http://localhost:3000/api';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
/*
  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/users').retry(3).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/users', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
*/

// data = { email, password}
  login({email, password}) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/users/login', JSON.stringify({email, password}), { headers: jsonHeader })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.info('Login Failed:', err)
          reject(err);
        });
    })
  }
}
