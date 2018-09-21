import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';


@Injectable()
export class CameraProvider {
  //public path: string;

  cameraImage: any;
  constructor(public camera: Camera) {
  }

/*  photo(){

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
  }*/
 
  public selectImage(sourceType, dataOption: number): Promise<any> {
    const source = (sourceType === 0) ? this.camera.PictureSourceType.PHOTOLIBRARY : this.camera.PictureSourceType.CAMERA
    return new Promise((resolve, reject) => {  
      let cameraOptions: CameraOptions = {
        sourceType: source,
        destinationType: dataOption,
        quality: 70,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
        allowEdit: true,
        saveToPhotoAlbum: false,
        targetWidth: 320,
        targetHeight: 320
      };

      this.camera.getPicture(cameraOptions).then((data) => {
        this.cameraImage =  data; resolve(this.cameraImage);
      }).catch(err=>{
        reject(err);
      });
    });
  }
}
