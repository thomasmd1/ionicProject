import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { AuthPage } from "../../pages/auth/auth"
import firebase from "firebase"
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../home/home';
import { ConcertProvider } from "../../providers/concert/concert"
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

interface Items {

}
@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  id:String
  city: String
  date: String
  name: String
  image: String
  lat: String
  long: String

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  isOnline: Boolean = false;

  constructor(public navCtrl: NavController,public view:ViewController, public navParams: NavParams, private alertCtrl: AlertController, public concertProvider:ConcertProvider) {
    let concert = navParams.data.item
    console.log(concert.id)
    this.id = String(concert.id)
    this.city = concert.city
    this.date = concert.date
    this.name = concert.name
    this.image = concert.url_image
    this.lat = concert.lat
    this.long = concert.lon
    this.UserIsOnline()

    if (firebase.auth().currentUser != null) {
      this.isOnline = true
    } else {
      this.isOnline = false
    }
  }

  ionViewDidLoad() {
    this.initMap(this.lat, this.long);
  }

  initMap(lat, long) {
    console.log(lat)
    console.log(long)
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: { lat: parseFloat(lat), lng: parseFloat(long) }
    });

    var marker = new google.maps.Marker({
      position: { lat: parseFloat(lat), lng: parseFloat(long) },
      map: this.map,
      title: this.name
    });

    this.directionsDisplay.setMap(this.map);
  }

  UserIsOnline() {
    if (firebase.auth().currentUser != null) {
      this.isOnline = true
    } else {
      this.isOnline = false
    }
  }

  deleteConcert() {
    let confirm = this.alertCtrl.create({
      title: "Etes vous sûr de vouloir supprimer le concert ? 😱",
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
            this.concertProvider.delete(this.id)
            this.view.dismiss()
            // this.navCtrl.push(HomePage)
          }
        }
      ]
    });
    confirm.present();
  }

  goToLogin() {
    this.navCtrl.push(AuthPage)
  }
}
