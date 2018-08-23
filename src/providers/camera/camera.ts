import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';


@Injectable()
export class CameraProvider {
  //public path: string;

  constructor(public camera: Camera, private imagePicker: ImagePicker) {
  }

  photo(){

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    return this.camera.getPicture(options)
  }

  choosePicture(){


    let options = {
      title: "profile_pic",
      message: "Select one picture",
      maximumImagesCount: 1,
      outType: 0
    }

    return this.imagePicker.getPictures(options)
  }
}
