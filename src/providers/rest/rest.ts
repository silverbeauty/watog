import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, ObjUser, Auth, resFile, Category, File, Resp, Post, UserResp, Report } from '../../types';
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

  public setProfile(user: User): Promise<User> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl+'/user/me', JSON.stringify(user), { headers })
        .subscribe((res: any) => {
          if (res.status) {
            const  user = res.data;
            resolve(user);
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

  public postADoc(file: any): Promise<Array<File>> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/post', file,{ headers })
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

  public searchByKey(keyword: string): Promise<Post> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/post?keyword=' + keyword,{ headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data);
          } else {
            console.error('Failed to vote post:', res)
            reject ('Failed to vote post')
          }
        }, (err) => {
          console.info('Failed to vote post:', err)
          reject(err);
        });
    })
  }

  public Voted(resp: Resp, str: string): Promise<UserResp> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/post'+str, resp ,{ headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as UserResp);
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

  public votePost(id: number, commend: boolean = true): Promise<Post> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/post/' + id + '/vote', { commend } ,{ headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Post);
          } else {
            console.error('Failed to vote post:', res)
            reject ('Failed to vote post')
          }
        }, (err) => {
          console.info('Failed to vote post:', err)
          reject(err);
        });
    })
  }

  public cancelVotePost(id: number): Promise<Post> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/post/' + id + '/vote/cancel', {} ,{ headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Post);
          } else {
            console.error('Failed to cancel vote post:', res)
            reject ('Failed to cancel vote post')
          }
        }, (err) => {
          console.info('Failed to cancel vote post:', err)
          reject(err);
        });
    })
  }

  public queryPost(str: string): Promise<Array<File>> {
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
            console.error('Failed to query file:', res)
            reject ('Failed to query file')
          }
        }, (err) => {
          console.info('Failed to send doc:', err)
          reject(err);
        });
    })
  }

  public queryPost_(str: string): Promise<Array<Post>> {
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

  public queryBestPost(str: string): Promise<string>{
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/post?order=vote_score&direction=DESC&limit=1&category_id='+str, { headers })
        .subscribe((res: any) => {
          if (res.status) {
            const post:Post = res.data[0] as Post;
            const photo = post.picture;
            resolve(photo);
          } else {
            console.error('Failed to get best post:', res)
            reject ('Failed to  get best post')
          }
        }, (err) => {
          console.info('Failed to  get best post:', err)
          reject(err);
        });
    })
  }


  public sendProfilePhoto(file: any): Promise<resFile>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/file', JSON.stringify({file: file}), { headers })
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

  public sendFile(file: any): Promise<resFile>{
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/file', JSON.stringify({file: file}), { headers })
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

  public signUp(user: ObjUser): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/user', JSON.stringify(user), { headers: jsonHeader })
        .subscribe((res: any) => {
          if (res.status) {
            const user:User = res.data;
            resolve(user);
          } else {
            reject('SignUp Failed:')
          }
        }, (err) => {
          reject('SignUp Failed:')
        });
    })
  }

  public sendProofPhoto(file: any): Promise<User>{
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/file/verify', JSON.stringify({file: file}), { headers })
        .subscribe((res: any) => {
          if (res.status) {
            const user:User = res.data;
            resolve(user);
          } else {
            reject('Save File Failed:')
          }
        }, (err) => {
          reject('Save File Failed:')
        });
    })
  }

  public sendVerifyRequest(url_verify: string): Promise<String>{
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiUrl+'/user/verify/'+ url_verify,  {}, {headers})
        .subscribe((res: any) => {
          if (res.status) {
            resolve('Send Success');
          } else {
            reject('Failed to Send Verification request!')
          }
        }, (err) => {
          console.info('Failed to Send Verification request!')
          reject('Failed to Send Verification request!');
        });
    })
  }

  public sendVerifyCode(url_verify: string, code_verify: string): Promise<User>{
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve,reject)=>{
      this.http.get(this.apiUrl+'/user/verify/'+ url_verify + '/' + code_verify,   {headers})
        .subscribe((res: any) => {
          if (res.status) {
            const user:User = res.data;
            resolve(user);
          } else {
            reject('Verification Code Not Correct!')
          }
        }, (err) => {
          reject('Verification Code Send Failed:')
        });
    })
  }

  public queryUsers(name: string, lastname: string = '', not_me: boolean = true, offset: number = 0, limit: number = 1000): Promise<Array<User>> {
    let completeName = '&name=' + name +'&last_name=' + lastname;
    if(lastname == '' || lastname == ' '){
      completeName = '&name=' + name;
    }
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token
    });
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/user?' + (not_me ? 'not_me&' : '') + 'offset=' + offset + '&limit=' + limit + completeName , { headers })
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

  public getCategory(id: number): Promise<Category> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token
    });
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/category/'+ id, { headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Category);
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
      this.http.post(this.apiUrl + `/post/` + post_id + '/vote', JSON.stringify({commend}),{ headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Post);
          } else {
            reject('Failed to vote!')
          }
        }, (err) => {
          console.info('Failed to vote:', err)
          reject(err);
        });
    })
  }

  public cancelVote(post_id: number): Promise<Post> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + `/post/` + post_id + '/vote/cancel', null,{  headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Post);
          } else {
            reject('Failed to cancel vote!')
          }
        }, (err) => {
          console.info('Failed to cancel vote:', err)
          reject(err);
        });
    })
  }

  public reportPost(post_id: number, type: string, description: string): Promise<Report> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + `/post/` + post_id + '/report', {
        type, description
      }, {  headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data as Report);
          } else {
            reject('Failed to report post!')
          }
        }, (err) => {
          console.info('Failed to report post:', err)
          reject(err);
        });
    })
  }

  public countPost(query: string): Promise<number> {
    const headers = new HttpHeaders({
      'Authorization':  RestProvider.token,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/post/count' + query, { headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data.count);
          } else {
            console.error('Failed to count posts:', res)
            reject ('Failed to count posts:')
          }
        }, (err) => {
          console.info('Failed to count posts:', err)
          reject(err);
        });
    })
  }
}

/**
public postADoc(file: any): Promise<Array<File>> {
  const headers = new HttpHeaders({
    'Authorization':  RestProvider.token,
    'Content-Type': 'application/json'
  });
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'/post', file,{ headers })
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
**/
