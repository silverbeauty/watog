import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Auth, resFile, Category } from '../../types';
import 'rxjs/add/operator/timeout';
import { server_url } from '../../environments/environment'


const jsonHeader = new HttpHeaders({
  'Content-Type':  'application/json'
});

@Injectable()
export class RestProvider {

  apiUrl: string = server_url;
  public static token: string;

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

  public login(email: string, password: string): Promise<Auth> {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/user/login', JSON.stringify({email, password}), { headers: jsonHeader })
        .subscribe((res: any) => {
          if (res.status) {
            const  { user, token } = res.data;
            RestProvider.token = token; // Set token
            const auth: Auth = user as Auth;
            auth.token = token;
            resolve(auth);
          } else {
            reject ('Invalid email or password')
          }
        }, (err) => {
          console.info('Login Failed:', err)
          reject(err);
        });
    })
  }

  public getProfile(): Promise<Auth> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/user/me', { headers })
        .subscribe((res: any) => {
          if (res.status) {
            const  user = res.data;
            const auth: Auth = user as Auth;
            auth.token = RestProvider.token;
            resolve(auth);
          } else {
            console.error('Failed to load profile:', res)
            reject ('Failed to load profile')
          }
        }, (err) => {
          console.info('Failed to load profile:', err)
          reject(err);
        });
    })
  }

  public postADoc(file: any): Promise<File> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/post', file ,{ headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(file as File);
          } else {
            console.error('Failed to load send doc:', res)
            reject ('Failed to send doc')
          }
        }, (err) => {
          console.info('Failed to send doc:', err)
          reject(err);
        });
    })
  }

  public getAllPost(): Promise<File> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/post', { headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data);
          } else {
            console.error('Failed to load send doc:', res)
            reject ('Failed to send doc')
          }
        }, (err) => {
          console.info('Failed to send doc:', err)
          reject(err);
        });
    })
  }

  public signUp(user: User): Promise<User> {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/user', user, { headers: jsonHeader })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as User);
          } else {
            reject('Sign Up failed!')
          }
        }, (err) => {
          console.info('SignUp Failed:', err)
          reject(err);
        });
    })
  }

  public sendFile(file: any): Promise<resFile>{
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/file', JSON.stringify({file: file}), { headers: jsonHeader })
        .timeout(30000)
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as resFile);
          } else {
            reject('Save file failed!')
          }
        }, (err) => {
          reject(err);
        });
    })
  }

  public queryUsers(name: string, offset: number = 0, limit: number = 10): Promise<Array<User>> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token
    });
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/user?offset=' + offset + '&limit=' + limit +'&name=' + name, { headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Array<User>);
          } else {
            reject('Failed to search!')
          }
        }, (err) => {
          console.info('Search User Failed:', err)
          reject(err);
        });
    })
  }

  public createCategory(category: any): Promise<Array<Category>> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/category', category, { headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Array<Category>);
          } else {
            reject('Failed to search!')
          }
        }, (err) => {
          console.info('Search User Failed:', err)
          reject(err);
        });
    });
  }

}
