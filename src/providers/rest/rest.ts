import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Auth, resFile, Category, File, Resp, Post } from '../../types';
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

  public setProfile(user: User): Promise<Auth> {
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

  public postADoc(file: File): Promise<Array<File>> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/post', file ,{ headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Array<File>);
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

  public Voted(resp: Resp, str: string): Promise<Array<Resp>> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/post'+str, resp ,{ headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Array<Resp>);
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

  public getAllPost(str: string): Promise<File> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/post'+str, { headers })
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

  public signUp(user: User): Promise<Auth> {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/user', JSON.stringify(user), { headers: jsonHeader })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Auth);
          } else {
            reject('SignUp Failed:')
          }
        }, (err) => {
          reject('SignUp Failed:')
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

  public queryCategories(offset: number = 0, limit: number = 1000): Promise<Array<Category>> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token
    });
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/category?offset=' + offset + '&limit=' + limit, { headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Array<Category>);
          } else {
            reject('Failed to query categories!')
          }
        }, (err) => {
          console.info('Failed to query categories:', err)
          reject(err);
        });
    })
  }

  public createVote(post_id: number, commend: boolean): Promise<Post> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + `/post/` + post_id + '/vote', { headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Post);
          } else {
            reject('Failed to query categories!')
          }
        }, (err) => {
          console.info('Failed to query categories:', err)
          reject(err);
        });
    })
  }
}
