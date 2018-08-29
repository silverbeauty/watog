import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { File } from '@ionic-native/file';


@Injectable()
export class FileProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FileProvider Provider');
  }



}
