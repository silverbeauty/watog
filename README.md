# Watog Ionic Mobile App

## Dependencies

- SQLite

```
ionic cordova plugin add cordova-sqlite-storage  
npm install --save @ionic-native/sqlite  
```

- Native Storage

```
ionic cordova plugin add cordova-plugin-nativestorage    
npm install --save @ionic-native/native-storage  
```
- Camera/Photo

```  
ionic cordova plugin add cordova-plugin-camera    
npm install --save @ionic-native/camera  
```  

- Image Picker  

```  
$ ionic cordova plugin add cordova-plugin-telerik-imagepicker --variable PHOTO_LIBRARY_USAGE_DESCRIPTION="Watog needs to access the photos to upload images."
$ npm install --save @ionic-native/image-picker

```  

sudo ionic cordova plugin add cordova-plugin-nativestorage

## How to run

### Browser

- `npm start`   

### Android  

- `npm run android`  

### iOS
This platform should be added by `ionic cordova platform add ios`
- `npm run ios`

### Google phone error
npm install --save-prod google-libphonenumber
