import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import firebase from "firebase"

/**
 * Generated class for the PhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
  
})
export class PhotoPage {
  public photos: any;
  public base64Image: string;
  public fileImage: string;
  public responseData: any;
  userData = { user_id: "", token: "", imageB64: "" };

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.photos = [];
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: "Etes vous sûr de vouloir supprimer la photo ? 😱",
      message: "",
      buttons: [
        {
          text: "Non 👎🏻",
          handler: () => {
            console.log("Pas OK");
          }
        },
        {
          text: "Oui 👍🏻",
          handler: () => {
            console.log("OK");
            this.photos.splice(index, 1);
          }
        }
        
      ]
    });
    confirm.present();
  }

  takePhoto() {
    console.log("coming here");

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 450,
      targetHeight: 450,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
        this.sendData(imageData);
      },
      err => {
        console.log(err);
      }
    );

    let confirm = this.alertCtrl.create({
      title: "La photo à été partagée, elle sera validée par un Admin",
      message: "",
      buttons: [
        {
          text: "Ok !",
          handler: () => {
            console.log("OK");
          }
        }
      ]
    });
    confirm.present();
  }

  sendData(imageData) {
    this.userData.imageB64 = imageData;

    //this.userData.user_id = "1";
    //this.userData.token = "222";

    console.log(this.userData);
    /*this.authService.postData(this.userData, "userImage").then(
      result => {
        this.responseData = result;
      },
      err => {
        // Error log
      }
    );*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoPage');
  }

}
